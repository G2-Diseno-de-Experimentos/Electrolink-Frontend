/**
 * Representa el tipo de un componente eléctrico.
 */
export class ComponentType {
    componentTypeId: number;
    name: string;
    description: string;

    constructor(data: { componentTypeId: number, name: string, description: string }) {
        this.componentTypeId = data.componentTypeId;
        this.name = data.name;
        this.description = data.description;
    }
}