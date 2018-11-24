import IntentLauncher, { IntentConstant } from "react-native-intent-launcher";

class AppOpen {
  googleAssistant = () => {
    IntentLauncher.startActivity({
      action: IntentConstant.ACTION_VOICE_ASSIST
    });
  };
}
export default new AppOpen();
