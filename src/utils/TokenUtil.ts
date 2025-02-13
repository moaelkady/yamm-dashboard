import { Constants } from "./constants";

export class TokenUtil {
    static getTokenFromMemory(): string {
        return localStorage.getItem(Constants.Token) || "";
    }

    static saveToken(token: string): void {
        localStorage.setItem(Constants.Token, token);
    }

    static clearToken(): void {
        localStorage.removeItem(Constants.Token);
    }
}