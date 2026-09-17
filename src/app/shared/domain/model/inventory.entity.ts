// src/app/models/technician-inventory.model.ts

import { ComponentStock, ComponentStockData } from './component-stock.entity';

export interface TechnicianInventoryData {
    inventoryId: string;
    technicianId: string;
    stock: ComponentStockData[];
}


export class TechnicianInventory {
    id: string;
    technicianId: string; 
    stockItems: ComponentStock[];

    constructor(data: TechnicianInventoryData) {
        this.id = data.inventoryId;
        this.technicianId = data.technicianId; 
        this.stockItems = (data.stock || []).map(itemData => new ComponentStock(itemData));
    }

    /**
     * Calcula el número total de piezas en el inventario.
     */
    get totalItemsCount(): number {
        return this.stockItems.reduce((total, item) => total + item.quantityAvailable, 0);
    }

    /**
     * Devuelve una lista de los items que están bajos de stock.
     */
    get lowStockItems(): ComponentStock[] {
        return this.stockItems.filter(item => item.isLowOnStock);
    }
}