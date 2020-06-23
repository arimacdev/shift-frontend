
export default function(context) {
  console.log('store is', context.store);
  OneSignal.getUserId().then(function(userId) {
    console.log('OneSignal User ID:', userId);
    context.store.dispatch('notification/addNotificationDevice', userId);
  });
}

window.OneSignal = window.OneSignal || [];
OneSignal.push(function() {
  console.log('Hello, from Onesignal');
  // OneSignal.isPushNotificationsEnabled(function(isEnabled) {
  //   if (isEnabled)
  //     console.log("Push notifications are enabled!");
  //   else
  //     console.log("Push notifications are not enabled yet.");
  // });
  OneSignal.getUserId().then(function(userId) {
    // console.log('OneSignal User ID:', userId);
    // notification.dispatch('notification/addNotificationDevice', userId);
    //   try {
    //     response = await this.$axios.$post(
    //       `/notification/register`,
    //       {
    //         headers: {
    //           user: "14",
    //         },
    //       },
    //       {
    //         data: {
    //           subscriptionId: userId,
    //           subscriberId: this.$store.state.user.userId,
    //           provider: "OneSignal",
    //           platform: "Web"
    //         },
    //       }
    //     );
    //   } catch (e) {
    //   console.log("error", e)
    // }
    // axios.post(`/notification/register`, {
    //   headers: {
    //     user: userId,
    //   },
    // },
    //   {
    //             data: {
    //               subscriptionId: userId,
    //               subscriberId: this.$store.state.user.userId,
    //               provider: "OneSignal",
    //               platform: "Web"
    //             },
    //           }
    // )
    // .then((response) => {
    //   // console.log(
    //   //   'CHILD TASKS ARE RETRIEVED SUCCESSFULLY-->',
    //   //   response.data.data
    //   // );
    // })
    // .catch((e) => {
    //   console.log('error retrieving children', e);
    // });
  });
  OneSignal.init({
    appId: 'fe6df906-c5cf-4c5e-bc1f-21003be4b2d5',
    notifyButton: {
      enable: false,
    },
    allowLocalhostAsSecureOrigin: true,
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
          explanation:
            'Get updates from all sorts of things that matter to you' /* Optional text appearing before the prompt button */,
        },
        unsubscribeEnabled: true /* Controls whether the prompt is visible after subscription */,
      },
    },
  });
  OneSignal.showNativePrompt();
});
