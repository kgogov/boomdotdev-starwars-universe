import { Entity } from "./Entity";

const BASE_URL = 'https://swapi.boom.dev/api/';

export class StarWarsUniverse {
    constructor() {
        this.entities = [];
    }

    async fetchAndDecode(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    async CreateEntities(entities) {

        try {
            for (const key in entities) {
                const data = await this.fetchAndDecode(entities[key]);
                const entity = new Entity(key, data);
                this.entities.push(entity);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async init() {
        const data = await this.fetchAndDecode(BASE_URL);
        const entities = await this.CreateEntities(data);
    }
}