// import {
//   Card,
//   Image,
//   Text,
//   Group,
//   Badge,
//   createStyles,
//   Button,
// } from "@mantine/core";

// import React from "react";
// import home from "../../assets/login.jpg";

// const useStyles = createStyles((theme) => ({
//   card: {
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
//     minWidth: 250,
//   },

//   imageSection: {
//     padding: theme.spacing.md,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderBottom: `1px solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
//     }`,
//   },

//   label: {
//     marginBottom: theme.spacing.xs,
//     lineHeight: 1,
//     fontWeight: 700,
//     fontSize: theme.fontSizes.xs,
//     letterSpacing: -0.25,
//     textTransform: "uppercase",
//   },

//   section: {
//     padding: theme.spacing.md,
//     borderTop: `1px solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
//     }`,
//   },

//   icon: {
//     marginRight: 5,
//     color:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[2]
//         : theme.colors.gray[5],
//   },
// }));

// export function ProductsCard({ data, onClick }) {
//   const { classes } = useStyles();
//   const { name, price, description, quantity, sale_price, is_sale, image } =
//     data;

//   return (
//     <Card withBorder radius="md" className={classes.card}>
//       <Card.Section className={classes.imageSection}>
//         <Image
//           height={150}
//           maw={220}
//           src={image ? image : home}
//           alt="No image to display"
//         />
//       </Card.Section>

//       <Group position="apart" mt="md">
//         <div>
//           <Text weight={500}>{}</Text>
//           <Text size="lg" color="dimmed">
//             {name}
//           </Text>
//         </div>
//         {is_sale && (
//           <Badge variant="outline" size="lg">
//             {Math.round(((price - sale_price) / price) * 100)}% off
//             {/* {((price - sale_price) / price) * 100}% off */}
//           </Badge>
//         )}
//       </Group>

//       <Card.Section className={classes.section} mt="md">
//         <Text size="sm" color="dimmed" className={classes.label}>
//           Quantity: {quantity}
//         </Text>

//         <Group spacing={8} mb={-8}>
//           {description}
//         </Group>
//       </Card.Section>

//       <Card.Section className={classes.section}>
//         <Group spacing={30}>
//           <div>
//             {is_sale ? (
//               <div>
//                 <Text
//                   td="line-through"
//                   size="sm"
//                   weight={700}
//                   sx={{ lineHeight: 1 }}>
//                   ${price}
//                 </Text>
//                 <Text size="xl" color="red" weight={700} sx={{ lineHeight: 1 }}>
//                   ${sale_price}
//                 </Text>{" "}
//               </div>
//             ) : (
//               <div>
//                 <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
//                   ${price}
//                 </Text>
//               </div>
//             )}
//           </div>
//           {quantity >= 1 ? (
//             <Button size="xs" radius="xl" style={{ flex: 1 }} onClick={onClick}>
//               Add to cart
//             </Button>
//           ) : (
//             <Badge variant="filled" size="lg" color="red" p={15}>
//               Out of Stock
//             </Badge>
//           )}
//         </Group>
//       </Card.Section>
//     </Card>
//   );
// }

// export default ProductsCard;
