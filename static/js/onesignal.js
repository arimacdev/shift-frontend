window.OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      console.log("Hello, from Onesignal");
      OneSignal.isPushNotificationsEnabled(function(isEnabled) {
        if (isEnabled)
          console.log("Push notifications are enabled!");
        else
          console.log("Push notifications are not enabled yet.");   
      });
      OneSignal.getUserId().then(function(userId) {
        console.log("OneSignal User ID:", userId);
      });
      OneSignal.init({
        appId: "fe6df906-c5cf-4c5e-bc1f-21003be4b2d5",
        notifyButton: {
          enable: false,
        },
        allowLocalhostAsSecureOrigin: true,
        promptOptions: {
          customlink: {
            enabled: true, /* Required to use the Custom Link */
            style: "button", /* Has value of 'button' or 'link' */
            size: "medium", /* One of 'small', 'medium', or 'large' */
            color: {
              button: '#E12D30', /* Color of the button background if style = "button" */
              text: '#FFFFFF', /* Color of the prompt's text */
            },
            text: {
              subscribe: "Subscribe to push notifications", /* Prompt's text when not subscribed */
              unsubscribe: "Unsubscribe from push notifications", /* Prompt's text when subscribed */
              explanation: "Get updates from all sorts of things that matter to you", /* Optional text appearing before the prompt button */
            },
            unsubscribeEnabled: true, /* Controls whether the prompt is visible after subscription */
          }
        }       
      })
      OneSignal.showNativePrompt();
    });