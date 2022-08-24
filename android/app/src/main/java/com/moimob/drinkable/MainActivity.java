package com.moimob.drinkable;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(com.getcapacitor.community.admob.AdMob.class);
        super.onCreate(savedInstanceState);
    }
}
