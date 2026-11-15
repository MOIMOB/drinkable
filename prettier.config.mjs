import base from '@moimob/prettier-config';

/** @type {import('prettier').Config} */
export default {
  ...base,
  plugins: ['prettier-plugin-organize-attributes'],
  attributeGroups: ["^repeat.for$", "^if.bind$", "^click.delegate$", "$DEFAULT", "^data-cy"],
};
