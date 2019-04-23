
//STANDARD REACT_NATIVE STUFF
package com.ssg.boilerplate;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

// Keep this here for 'react-native link'
// import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.clipsub.rnbottomsheet.RNBottomSheetPackage;
import com.wix.interactable.Interactable;
import co.apptailor.googlesignin.RNGoogleSigninPackage;  // <--- import

//REAT_NATIVE_NAVIGATION
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import android.support.annotation.Nullable;

//REACT_NATIVE_BRANCH
import io.branch.rnbranch.RNBranchPackage;
import io.branch.referral.Branch;

//REACT_NATIVE_CRASHLYTICS
import com.smixx.fabric.FabricPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

//REACT_NATIVE_FIREBASE
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // <-- Add this line
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // <-- Add this line
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; // <-- Add this line

import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

//REACT_NATIVE_LOTTIE
import com.airbnb.android.react.lottie.LottiePackage;

//VECTOR_ICONS
import com.oblador.vectoricons.VectorIconsPackage;

//REACT_NATIVE_DEVICE_INFO
import com.learnium.RNDeviceInfo.RNDeviceInfo;

//REACT_NATIVE_VIEW_OVERFLOW
import com.entria.views.RNViewOverflowPackage;

//REACT_NATIVE_SVG
import com.horcrux.svg.SvgPackage;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            // Keep this here for `react-native link`
            // new MainReactPackage(),
            new RNBottomSheetPackage(),
            new Interactable(),

            //REACT_NATIVE_FIRE_BASE
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNFirebaseNotificationsPackage(),
            //END OF REACT_NATIVE_FIRE_BASE

            new FabricPackage(),
            new LottiePackage(),
            new VectorIconsPackage(),
            new RNDeviceInfo(),
            new RNBranchPackage(),
            new FacebookLoginPackage(),
            new SvgPackage(),
            new RNGoogleSigninPackage(),
            new LinearGradientPackage(),
            new RNViewOverflowPackage(),
            new AsyncStoragePackage(),
            new NetInfoPackage(),
            new RNCWebViewPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    String getJSMainModuleName() { return "index"; }


    @Override
    public void onCreate() {
        super.onCreate();
        Branch.getAutoInstance(this);
    }

}
