import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const SettingsScreen = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Settings" component={SettingsMain} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="Privacy" component={Privacy} />
    </Drawer.Navigator>
  );
};

const SettingsMain = () => {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
}
const Notifications = () => {
  return (
    <View>
      <Text>Notifications Screen</Text>
    </View>
  );
}
const Privacy = () => {
  return (
    <View>
      <Text>Privacy Screen</Text>
    </View>
  );
}

export default SettingsScreen;