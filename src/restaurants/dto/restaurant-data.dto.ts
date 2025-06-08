import { Restaurant } from "../entities/restaurant.entity";

export class RestaurantDataDto {

    id: string;
    name: string;
    slug: string;
    address: string;
    phone: string;
    state: string;
    image: string;
    hour_open: string;
    hour_close: string;

    constructor(restaturant: Restaurant) {
        this.id = restaturant.id;
        this.name = restaturant.name;
        this.slug = restaturant.slug;
        this.address = restaturant.address;
        this.phone = restaturant.phone;
        this.state = restaturant.state;
        this.image = restaturant.image;
        this.hour_open = restaturant.hour_open;
        this.hour_close = restaturant.hour_close;
    }
}