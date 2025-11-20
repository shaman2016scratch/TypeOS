package com.typeos.ui;

import android.app.Activity;
import android.webkit.WebView;

public class MainActivity extends Activity {
    WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        webView = findViewById(R.id.webview);
        loadTypeOS();
    }

    private void loadTypeOS() {
        webView.loadUrl("file:///android_asset/webview/index.html");
    }
}
