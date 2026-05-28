package com.moimob.drinkable;

import android.os.Bundle;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsAnimationCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;

import java.util.List;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webview = getBridge().getWebView();

        ViewCompat.setWindowInsetsAnimationCallback(webview, new WindowInsetsAnimationCompat.Callback(WindowInsetsAnimationCompat.Callback.DISPATCH_MODE_STOP) {
            @NonNull
            @Override
            public WindowInsetsCompat onProgress(@NonNull WindowInsetsCompat insets, @NonNull List<WindowInsetsAnimationCompat> runningAnimations) {
                int imeBottom = insets.getInsets(WindowInsetsCompat.Type.ime()).bottom;
                int navBarBottom = insets.getInsets(WindowInsetsCompat.Type.navigationBars()).bottom;
                int keyboardHeightPx = Math.max(0, imeBottom - navBarBottom);
                float density = getResources().getDisplayMetrics().density;
                float keyboardHeightCss = keyboardHeightPx / density;
                String js = "document.documentElement.style.setProperty('--keyboard-inset-height', '" + keyboardHeightCss + "px')";
                webview.post(() -> webview.evaluateJavascript(js, null));
                return insets;
            }
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        getBridge().getWebView().setOverScrollMode(WebView.OVER_SCROLL_NEVER);
    }
}
