import { RootStackParamList } from "./src/navigation";
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
      }
}