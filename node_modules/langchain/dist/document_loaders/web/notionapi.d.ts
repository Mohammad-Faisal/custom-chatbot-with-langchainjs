import { Client } from "@notionhq/client";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
import { AsyncCaller } from "../../util/async_caller.js";
/**
 * Represents the type of Notion API to load documents from. The options
 * are "database" or "page".
 */
export type NotionAPIType = "database" | "page";
export type OnDocumentLoadedCallback = (current: number, total: number, currentTitle?: string, rootTitle?: string) => void;
export type NotionAPILoaderOptions = {
    clientOptions: ConstructorParameters<typeof Client>[0];
    id: string;
    type?: NotionAPIType;
    callerOptions?: ConstructorParameters<typeof AsyncCaller>[0];
    onDocumentLoaded?: OnDocumentLoadedCallback;
};
/**
 * A class that extends the BaseDocumentLoader class. It represents a
 * document loader for loading documents from Notion using the Notion API.
 */
export declare class NotionAPILoader extends BaseDocumentLoader {
    private caller;
    private notionClient;
    private n2mClient;
    private id;
    private pageQueue;
    private pageCompleted;
    pageQueueTotal: number;
    private documents;
    private rootTitle;
    private onDocumentLoaded;
    constructor(options: NotionAPILoaderOptions);
    private addToQueue;
    /**
     * Parses the properties of a Notion page and returns them as key-value
     * pairs.
     * @param page The Notion page to parse.
     * @returns An object containing the parsed properties as key-value pairs.
     */
    private parsePageProperties;
    /**
     * Parses the details of a Notion page and returns them as an object.
     * @param page The Notion page to parse.
     * @returns An object containing the parsed details of the page.
     */
    private parsePageDetails;
    /**
     * Loads a Notion block and returns it as an MdBlock object.
     * @param block The Notion block to load.
     * @returns A Promise that resolves to an MdBlock object.
     */
    private loadBlock;
    /**
     * Loads Notion blocks and their children recursively.
     * @param blocksResponse The response from the Notion API containing the blocks to load.
     * @returns A Promise that resolves to an array containing the loaded MdBlocks.
     */
    private loadBlocks;
    /**
     * Loads a Notion page and its child documents, then adds it to the completed documents array.
     * @param page The Notion page or page ID to load.
     */
    private loadPage;
    /**
     * Loads a Notion database and adds it's pages to the queue.
     * @param id The ID of the Notion database to load.
     */
    private loadDatabase;
    /**
     * Loads the documents from Notion based on the specified options.
     * @returns A Promise that resolves to an array of Documents.
     */
    load(): Promise<Document[]>;
}
