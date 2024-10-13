import {
  Avatar,
  Blockquote,
  Cell,
  Rating,
  Section,
} from "@telegram-apps/telegram-ui";

const reviews = [
  {
    id: 0,
    author: {
      id: 1,
      tg_id: "vi_du",
      firstName: "Vitaly",
      lastName: "Dudarev",
    },
    rating: 5,
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo quo delectus sint natus accusamus! Suscipit minima quam in, asperiores itaque enim recusandae quisquam eos pariatur atque, quis nisi placeat alias quas perspiciatis repellendus ullam id ad. Maxime vel ducimus temporibus totam laudantium quod molestiae saepe illum tempore minima veniam optio obcaecati quasi quas, omnis numquam ab sit ipsa, in ea beatae eveniet qui voluptatem debitis! Corrupti est, voluptatibus vero cum, at dignissimos incidunt soluta architecto suscipit mollitia perspiciatis? Eos, voluptatum mollitia magnam recusandae libero dolorem nostrum magni? Voluptatibus, sed!",
  },
  {
    id: 1,
    author: {
      id: 2,
      tg_id: "dz3nnn",
      firstName: "Denis",
      lastName: "",
    },
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel inventore, quisquam ab soluta repudiandae officia fugiat! Rerum, dolore nihil quo accusantium delectus blanditiis iusto. Deserunt, soluta. Quaerat natus deserunt magnam.",
  },
];

export const ReviewsListWidget = () => {
  return (
    <>
      {reviews.map((review) => {
        return (
          <Section key={review.id}>
            <Cell
              after={
                <Rating
                  precision={0.1}
                  value={review.rating}
                  onChange={(e) => console.log(e)}
                  disabled
                  readOnly
                />
              }
              before={
                <Avatar
                  size={48}
                  acronym={
                    review.author.lastName
                      ? review.author.firstName[0] + review.author.lastName[0]
                      : review.author.firstName[0]
                  }
                />
              }
              subtitle={"@" + review.author.tg_id}
            >
              {review.author.firstName} {review.author.lastName}
            </Cell>
            <Cell multiline>
              <Blockquote type="text">{review.comment}</Blockquote>
            </Cell>
          </Section>
        );
      })}
    </>
  );
};
