/**
 * The interface for Overlay 
 */
export interface IOverlay {
    baseInsertDiv: HTMLDivElement;
    currentElement: HTMLDivElement;
    overlayDivId: string;
    overlayDivClass: string;
    overlayHtmlElement: HTMLElement;
    overlayClickEvent: EventListener;

    /**
     * Create a clickable div with text and onclick functions    
     */
    createNewOverlayElement(): void;

    /**
     * hide the overlay by setting a hiddenState class and runs any onHideOverlay functionality 
     */
    hideOverlay(): void;

    /**
     * An override function that users can pass in custom functionality for before an overlay is shown 
     */
    beforeShowOverlay(): any;

    /**
    * An override function that users can pass in custom functionality for after an overlay has shown 
    */
    afterShowOverlay(): any;

    /**
     * An override function that users can pass in custom functionality for before an overlay is hidden 
     */
    beforeHideOverlay(): any;

    /**
    * An override function that users can pass in custom functionality for after an overlay has hidden
    */
    afterHideOverlay(): any;

    /**
     * Update an overlays div html contents 
     * @param htmlContent a string of html content you wish to replace into you div
     */
    updateOverlayContents(htmlContent: string): void;
}