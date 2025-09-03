#!/usr/bin/env python3
"""
Translation completeness checker for Drinkable app
Compare JSON translation files between English and any target language
to identify missing translations.
"""

import json
import sys
from pathlib import Path
import argparse


def load_json(file_path):
    """Load JSON file with error handling"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return {}
    except json.JSONDecodeError as e:
        print(f"JSON decode error in {file_path}: {e}")
        return {}


def get_all_keys(data, prefix="", ignore_keys=None):
    """Recursively get all keys from JSON (including nested ones)"""
    if ignore_keys is None:
        ignore_keys = set()

    keys = set()
    if isinstance(data, dict):
        for key, value in data.items():
            full_key = f"{prefix}.{key}" if prefix else key

            # Skip ignored keys (like time-related translations)
            if full_key not in ignore_keys:
                keys.add(full_key)
                if isinstance(value, dict):
                    keys.update(get_all_keys(value, full_key, ignore_keys))
    return keys


def get_nested_value(data, key_path):
    """Get value from nested dictionary using dot notation"""
    keys = key_path.split(".")
    value = data
    try:
        for key in keys:
            value = value[key]
        return value
    except (KeyError, TypeError):
        return None


def find_key_location(file_path, key_path):
    """Find approximate line number of a key in JSON file"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

        # For nested keys, look for the last part of the key
        search_key = key_path.split(".")[-1]

        for i, line in enumerate(lines, 1):
            if f'"{search_key}"' in line:
                return i
        return None
    except:
        return None


def compare_translations(en_file, target_file, file_name):
    """Compare English and target language translation files"""
    en_data = load_json(en_file)
    target_data = load_json(target_file)

    if not en_data:
        print(f"❌ {file_name}: English file missing")
        return [], []

    if not target_data:
        print(f"❌ {file_name}: Target file missing")
        return [], []

    # Ignore time-related keys that are handled by i18next automatically
    ignore_keys = {
        "now",
        "second_ago",
        "second_ago_other",
        "second_in",
        "second_in_other",
        "minute_ago",
        "minute_ago_other",
        "minute_in",
        "minute_in_other",
        "hour_ago",
        "hour_ago_other",
        "hour_in",
        "hour_in_other",
        "day_ago",
        "day_ago_other",
        "day_in",
        "day_in_other",
        "month_ago",
        "month_ago_other",
        "month_in",
        "month_in_other",
        "year_ago",
        "year_ago_other",
        "year_in",
        "year_in_other",
    }

    en_keys = get_all_keys(en_data, ignore_keys=ignore_keys)
    target_keys = get_all_keys(target_data, ignore_keys=ignore_keys)

    missing_keys = en_keys - target_keys
    extra_keys = target_keys - en_keys

    completion_rate = len(target_keys - missing_keys) / len(en_keys) * 100

    if missing_keys:
        print(
            f"❌ {file_name}: {len(missing_keys)} missing ({completion_rate:.1f}% complete)"
        )
        en_file_path = f"src/locales/en/{file_name}"

        # Sort by line number instead of alphabetically
        missing_with_lines = []
        for key in missing_keys:
            line_num = find_key_location(en_file, key)
            missing_with_lines.append(
                (key, line_num or 999999)
            )  # Put keys without line numbers at the end

        # Sort by line number
        missing_with_lines.sort(key=lambda x: x[1])

        for key, line_num in missing_with_lines:
            location = f":{line_num}" if line_num and line_num != 999999 else ""
            print(f"   {key} (from {en_file_path}{location})")
    else:
        print(f"✅ {file_name}: Complete ({completion_rate:.1f}%)")

    if extra_keys:
        print(f"⚠️  {file_name}: {len(extra_keys)} extra keys")

    return list(missing_keys), list(extra_keys)


def get_available_languages():
    """Get list of available language codes"""
    locales_path = Path("src/locales")
    if not locales_path.exists():
        return []

    languages = []
    for item in locales_path.iterdir():
        if item.is_dir() and item.name != "en":
            languages.append(item.name)
    return sorted(languages)


def main():
    """Main function"""
    parser = argparse.ArgumentParser(
        description="Check translation completeness for Drinkable app",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python check.py zh           # Check Chinese translations
  python check.py fr           # Check French translations  
  python check.py de           # Check German translations
  python check.py --list       # List available languages
        """,
    )

    parser.add_argument(
        "language", nargs="?", help="Target language code (e.g., zh, fr, de)"
    )
    parser.add_argument("--list", action="store_true", help="List available languages")
    parser.add_argument(
        "--files",
        nargs="+",
        default=[
            "translation.json",
            "cocktails.json",
            "ingredients.json",
            "instructions.json",
        ],
        help="JSON files to check (default: all)",
    )

    args = parser.parse_args()

    # Check if we're in the right directory
    if not Path("src/locales").exists():
        print(
            "❌ src/locales directory not found. Please run this script from the project root."
        )
        sys.exit(1)

    # List available languages
    if args.list:
        languages = get_available_languages()
        if languages:
            print("Available languages:")
            for lang in languages:
                print(f"  • {lang}")
        else:
            print("No translation directories found (except 'en')")
        return

    # Validate language argument
    if not args.language:
        available = get_available_languages()
        print("❌ Language code required.")
        if available:
            print(f"Available languages: {', '.join(available)}")
            print("Use --list to see all available languages")
        else:
            print("No translation directories found")
        sys.exit(1)

    target_lang = args.language

    print(f"🔍 Checking {target_lang.upper()} translations\n")

    base_path = Path("src/locales")
    en_path = base_path / "en"
    target_path = base_path / target_lang

    if not target_path.exists():
        print(f"❌ Translation directory not found: {target_path}")
        available = get_available_languages()
        if available:
            print(f"Available: {', '.join(available)}")
        sys.exit(1)

    total_missing = 0
    total_extra = 0

    for file_name in args.files:
        en_file = en_path / file_name
        target_file = target_path / file_name

        if not en_file.exists():
            print(f"⚠️  Skipping {file_name}: English file not found")
            continue

        missing, extra = compare_translations(en_file, target_file, file_name)
        total_missing += len(missing)
        total_extra += len(extra)

    print(f"\n📊 Summary: {total_missing} missing, {total_extra} extra")
    if total_missing == 0:
        print("🎉 All translations complete!")


if __name__ == "__main__":
    main()
