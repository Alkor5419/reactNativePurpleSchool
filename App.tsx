import { StatusBar } from "expo-status-bar";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Input } from "./shared/Input/Input";
import { Colors, Gaps } from "./shared/tokens";

export default function App() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("./assets/logo.png")}
                    resizeMode="contain"
                />

                <View style={styles.content}>
                    <Input placeholder="Email" />
                    <Input placeholder="Пароль" />
                    <Button title="Войти" />
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
