export interface IDataGenerator {
    askForContent(title: string): Promise<string>;
}