// {/* <script>
//   var OneSignal = window.OneSignal || [];
//   OneSignal.push(function() {
//     OneSignal.init({
//       appId: "45e39e49-0bb3-4d57-a9f9-9c6dcbe2e118",
//     })
//   });
// </script> */}
// {/* <div> */}
// {/* <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script> */}
// <script>

  
// </script>
// // </div>
<head>
  <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
  <script>
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
               appId: "caab97bf-359f-4c09-91ad-4a6752ce1667",

        notifyButton: {
          enable: true,
        },
      })
      OneSignal.showNativePrompt();
    });
  </script>
</head>