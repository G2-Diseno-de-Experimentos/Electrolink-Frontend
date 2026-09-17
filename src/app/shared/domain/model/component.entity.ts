export interface ComponentData {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  componentTypeId: number;
}

export class Component {
    id: string; 
    name: string;
    description: string;
    isActive: boolean;
    typeId: number;

    /**
     * @param data - Datos para inicializar el componente.
     */
    constructor(data: ComponentData) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.isActive = data.isActive; 
        this.typeId = data.componentTypeId;
    }
}