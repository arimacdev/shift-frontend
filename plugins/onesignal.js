export default function(context) {
  window.OneSignal = window.OneSignal || [];
  OneSignal.push(() => {
    console.log('Hello, from Onesignal');

    OneSignal.init({
      appId: 'fe6df906-c5cf-4c5e-bc1f-21003be4b2d5',
      notifyButton: {
        enable: false,
      },
      allowLocalhostAsSecureOrigin: true,
      persistNotification: false,
      promptOptions: {
        customlink: {
          enabled: true /* Required to use the Custom Link */,
          style: 'button' /* Has value of 'button' or 'link' */,
          size: 'medium' /* One of 'small', 'medium', or 'large' */,
          color: {
            button:
              '#E12D30' /* Color of the button background if style = "button" */,
            text: '#FFFFFF' /* Color of the prompt's text */,
          },
          text: {
            subscribe:
              'Subscribe to push notifications' /* Prompt's text when not subscribed */,
            unsubscribe:
              'Unsubscribe from push notifications' /* Prompt's text when subscribed */,
            // explanation:
            //   'Get updates from all sorts of things that matter to you' /* Optional text appearing before the prompt button */,
          },
          unsubscribeEnabled: true /* Controls whether the prompt is visible after subscription */,
        },
      },
    });
    OneSignal.getUserId().then((userId) => {
      console.log('OneSignal User ID: ===>', userId);
      if (userId != null) {
        context.store.dispatch('notification/addNotificationDevice', userId);
      }
    });
    OneSignal.showNativePrompt();
  });
}
