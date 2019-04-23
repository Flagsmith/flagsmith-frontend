package com.ssg.boilerplate;

import com.reactnativenavigation.NavigationActivity;
import io.branch.rnbranch.*; // <-- add this
import android.content.Intent; // <-- and this

public class MainActivity extends NavigationActivity {
    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
