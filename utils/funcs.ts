export class Funcs {
    public static async delay(ms: number) {
        return await new Promise(res => setTimeout(res, ms));
    }
}