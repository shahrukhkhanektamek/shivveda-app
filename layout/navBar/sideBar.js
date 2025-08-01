import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "../StyleSheet/theme";

import { postData, apiUrl } from "../component/api";
const urls = apiUrl();

import { MMKV } from "react-native-mmkv";
const storage = new MMKV();

const SideBar = ({ navigation, extraData = [] }) => {
  const [userDetail, setuserDetail] = useState(JSON.parse(storage.getString("user")));
  const setSideBar = extraData.sidebar.setSideBar;
  const showSideBar = extraData.sidebar.showSideBar;

  // console.log(userDetail);

  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const handleLogout = async () => {
    var filedata = {};
    const response = await postData(filedata, urls.logout, "GET", navigation, extraData);
  };

  const translateX = useRef(new Animated.Value(-250)).current;
  const panResponder = useRef(
    PanResponder.create({
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0) {
          translateX.setValue(-250 + gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
          openSidebar();
        } else {
          closeSidebar();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (showSideBar) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }, [showSideBar]);

  const openSidebar = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(translateX, {
      toValue: -250,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSideBar(false));
  };

  if (!showSideBar) return null;

  return (
    <TouchableWithoutFeedback onPress={closeSidebar}>
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.container, { transform: [{ translateX }] }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          {/* User Profile */}
          <View style={styles.profileSection}>
            <Image source={{uri:userDetail.image}} style={styles.profileImage} />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{userDetail.name}</Text>
              <Text style={styles.profileID}>{userDetail.user_id}</Text>
            </View>
          </View>

          {/* Menu List */}
          <ScrollView style={styles.body}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
              <View style={styles.menuIcon}>
                <Icon name="home" style={[theme.sideBarIconColor]} />
              </View>
              <Text style={styles.menuTextLabel}>Home</Text>
            </TouchableOpacity>
            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("NewRegister")}>
              <View style={styles.menuIcon}>
                <Icon name="person-add" style={[theme.sideBarIconColor]} />
              </View>
              <Text style={styles.menuTextLabel}>New Register</Text>
            </TouchableOpacity>
            <View style={styles.divider} />



            <>
              {userDetail.is_paid == 0 ? (
                <>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Products")}>
                    <View style={styles.menuIcon}>
                      <Icon name="checkmark-circle" style={[theme.sideBarIconColor]} />
                    </View>
                    <Text style={styles.menuTextLabel}>Account Activation</Text>
                  </TouchableOpacity>
                  <View style={styles.divider} />
                </>
              ) : (
                <>
                  {/* 👇 Re Purchase Menu with Submenu */}
                  <TouchableOpacity style={styles.menuItem} onPress={() => toggleSubmenu("rePurchase")}>
                    <View style={styles.menuIcon}>
                      <Icon name="cart" style={[theme.sideBarIconColor]} />
                    </View>
                    <Text style={styles.menuTextLabel}>Repurchase</Text>
                    <Icon
                      name={expandedMenus.rePurchase ? "chevron-up" : "chevron-down"}
                      size={20}
                      style={{ marginLeft: "auto", color: "#000" }}
                    />
                  </TouchableOpacity>

                  {expandedMenus.rePurchase && (
                    <View style={styles.subMenuContainer}>
                      <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("Products")}>
                        <Text style={styles.menuTextLabel}>Product</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("Order")}>
                        <Text style={styles.menuTextLabel}>My Orders</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("LavelEarning")}>
                        <Text style={styles.menuTextLabel}>Repurchase Business</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={styles.divider} />
                  {/* ☝ End Submenu */}
                </>
              )}
            </>
            
            


            

          

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Team")}>
              <View style={styles.menuIcon}>
                <Icon name="people" style={[theme.sideBarIconColor]} />
              </View>
              <Text style={styles.menuTextLabel}>Team</Text>
            </TouchableOpacity>
            <View style={styles.divider} />



            {/* 👇 Profile Menu with Submenu */}
            <TouchableOpacity style={styles.menuItem} onPress={() => toggleSubmenu("team")}>
              <View style={styles.menuIcon}>
                <Icon name="person" style={[theme.sideBarIconColor]} />
              </View>
              <Text style={styles.menuTextLabel}>Profile</Text>
              <Icon
                name={expandedMenus.team ? "chevron-up" : "chevron-down"}
                size={20}
                style={{ marginLeft: "auto", color: "#000" }}
              />
            </TouchableOpacity>
            {expandedMenus.team && (
              <View style={styles.subMenuContainer}>
                <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("Profile")}>
                  <Text style={styles.menuTextLabel}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("ChangePassword")}>
                  <Text style={styles.menuTextLabel}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate("Kyc")}>
                  <Text style={styles.menuTextLabel}>Kyc</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.divider} />
            {/* ☝ End Submenu */}



            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Withdrawal")}>
              <View style={styles.menuIcon}>
                <Icon name="cash-outline" style={[theme.sideBarIconColor]} />
              </View>
              <Text style={styles.menuTextLabel}>Withdrawal</Text>
            </TouchableOpacity>
            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Earning")}>
              <View style={styles.menuIcon}>
                <Icon name="bar-chart" style={[theme.sideBarIconColor]} />
              </View>
              <Text style={styles.menuTextLabel}>Earnings</Text>
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ReminderList")}>
              <View style={styles.menuIcon}>
                <Icon name="gift" style={[theme.sideBarIconColor]} />
              </View>
              <Text style={styles.menuTextLabel}>Reward & Gift</Text>
            </TouchableOpacity>
            <View style={styles.divider} /> */}

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Support")}>
              <View style={styles.menuIcon}>
                <Icon name="call" style={[theme.sideBarIconColor]} />
              </View>
              <Text style={styles.menuTextLabel}>Help & Support</Text>
            </TouchableOpacity>
            <View style={styles.divider} />

            

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuIcon}>
                <Icon name="log-out-outline" style={[theme.sideBarIconColor]} />
              </View>
              <Text style={styles.menuTextLabel}>Log Out</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
          </ScrollView>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 250,
    height: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
    borderRadius: 5,
  },
  closeText: {
    color: "#000000",
    fontSize: 22,
  },
  profileSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#000000",
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  profileID: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  body: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  subMenuContainer: {
    paddingLeft: 60,
  },
  subMenuItem: {
    paddingVertical: 6,
  },
  menuIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    marginRight: 10,
  },
  menuTextLabel: {
    fontSize: 16,
    color: "#000000",
  },
  divider: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default SideBar;
