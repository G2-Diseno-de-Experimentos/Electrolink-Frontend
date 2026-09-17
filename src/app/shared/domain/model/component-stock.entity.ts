
export interface ComponentStockData {
    componentStockId: string;
    technicianInventoryId: string;
    componentId: string;
    componentName: string;
    quantityAvailable: number;
    alertThreshold: number;
    lastUpdated: string;
}

/**
 * Representa un item de stock de un componente en el inventario de un técnico.
 */
export class ComponentStock {
    id: string;
    technicianInventoryId: string;
    componentId: string;
    componentName: string;
    quantityAvailable: number;
    alertThreshold: number;
    lastUpdated: Date;

    constructor(data: ComponentStockData) {
        this.id = data.componentStockId;
        this.technicianInventoryId = data.technicianInventoryId;
        this.componentId = data.componentId;
        this.componentName = data.componentName;
        this.quantityAvailable = data.quantityAvailable;
        this.alertThreshold = data.alertThreshold;
        this.lastUpdated = new Date(data.lastUpdated);
    }

    get isLowOnStock(): boolean {
        return this.quantityAvailable <= this.alertThreshold;
    }

    get formattedLastUpdated(): string {
        return this.lastUpdated.toLocaleString();
    }
}