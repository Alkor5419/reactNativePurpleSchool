import { StatusBar } from "expo-status-bar";
import {
    Alert,
    Image,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View,
} from "react-native";
import { Input } from "./shared/Input/Input";
import { Colors, Gaps } from "./shared/tokens";
import { Button } from "./shared/Button/Button";
import { ErrorNotification } from "./shared/ErrorNotification/ErrorNotification";
import { useState } from "react";

export default function App() {
    const [error, setError] = useState<
        string | undefined
    >();
    const alert = () => {
        //Alert
        // Alert.alert("Ошибка", "Неверный логин или пароль", [
        //     {
        //         text: "Хорошо",
        //         onPress: () => {},
        //         style: "cancel",
        //     },
        // ]);
        // if (Platform.OS === "android")
        //     ToastAndroid.showWithGravity(
        //         "Неверный логин или пароль",
        //         ToastAndroid.SHORT,
        //         ToastAndroid.CENTER
        //     );
        setError("Неверный логин или пароль");
        setTimeout(() => {
            setError(undefined);
        }, 3000);
    };
    return (
        <View style={styles.mainContainer}>
            <ErrorNotification error={error} />
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("./assets/logo.png")}
                    resizeMode="contain"
                />

                <View style={styles.content}>
                    <Input placeholder="Email" />
                    <Input
                        placeholder="Пароль"
                        isPassword
                    />
                    <Button text="Войти" onPress={alert} />
                </View>

                <Text>Восстановить пароль</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 55,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    content: {
        justifyContent: "center",
        gap: Gaps.g16,
        marginBottom: 50,
        width: "100%",
    },
    logo: {
        marginBottom: 50,
        width: 220,
    },
});
