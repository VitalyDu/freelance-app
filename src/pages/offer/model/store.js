import { makeAutoObservable } from "mobx";

export class OfferStore {
  initial = true;
  loading = true;
  abortController = null;
  data = {};

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  clear = () => {
    this.initial = true;
    this.loading = true;
    this.abortController = null;
    this.data = {};
  };

  getOffer = async (params = {}) => {
    this.loading = false;
    this.initial = false;

    this.data = {
      id: 123,
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, nisi.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis magnam optio facilis excepturi dolorem voluptatibus sint dicta, harum iusto eum tempora vero repellat, porro cupiditate quisquam numquam enim amet dolorum laboriosam eaque possimus officiis! A earum illum minima quae? Quod, odit pariatur? Perspiciatis dolorem, vero provident, at officiis amet accusantium cum sint praesentium quas, animi doloremque? Aperiam, alias eaque officia minus, saepe perferendis, quae expedita beatae veritatis neque quam. Vitae, nemo dignissimos consequuntur itaque recusandae nobis adipisci sed sapiente exercitationem magni inventore eum culpa perspiciatis corrupti provident sunt aliquam saepe. Molestiae sunt laborum nihil incidunt voluptate at voluptas error saepe quas praesentium cum quae voluptatibus eius eaque totam officia rem magnam quis vero vel odio, corrupti quibusdam laboriosam debitis? Consectetur unde quidem labore excepturi ullam cumque, molestiae velit recusandae vitae.",
      isDeleted: false,
      isVisible: true,
      author: {
        username: "vi_du",
        firstName: "Vitaly",
        lastName: "Du",
        ownerRating: 4.0,
        freelanceRating: 4.8,
      },
      category: {
        key: "web-dev",
        label: "Веб-разработка",
      },
      division: {
        key: "frontend",
        label: "Frontend",
      },
      views: 50,
      responses: 12,
      paymentType: {
        key: "post",
        label: "Постоплата",
      },
      currency: "ton",
      amount: 100,
      executor: {
        username: "dz3nnn",
        firstName: "Denis",
        lastName: "",
        ownerRating: 4.9,
        freelanceRating: 4.5,
      },
      status: "in_work",
      createdDate: "2024-10-13T18:59:40.503220Z",
    };
  };
}
