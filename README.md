<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/harbanery/mama-food-recipe-app">
    <img src="./public/brandicon.ico" alt="Logo" width="80">
  </a>

  <h1 align="center">Mama Recipe</h1>

  <p align="center">
    Food Recipe Implementation
    <br />
    <br />
    <a href="https://mama-recipe-food.vercel.app/" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/harbanery/be-mama-food-recipe-app" target="_blank">View Back-End Repo</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-environment-variables">Setup Environment Variables</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
    <ul>
        <!-- <li><a href="#features">Features</a></li> -->
        <li><a href="#screenshots">Screenshots</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ul>
</details>

## About The Project

My web-based application, **Mama Recipe**, is specifically designed for food enthusiasts who are always seeking new inspirations in the kitchen. With a constantly updated collection of recipes from around the world, you can discover a wide range of dishes, from traditional cuisine to modern creations. Interactive features such as video tutorials, automatic shopping lists, and an online chef community make your cooking experience more enjoyable and easy. So, what are you waiting for? Explore **Mama Recipe** now and find your new favorite recipes!

### Built With

[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![Tailwind][Tailwind]][Tailwind-url]
[![Redux][Redux]][Redux-url]
[![Node][Node.js]][Node-url]

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm

  ```sh
    npm install npm@latest -g
  ```

### Installation

1. Clone Repo

   ```sh
     git clone https://github.com/harbanery/mama-food-recipe-app.git
   ```

2. Install NPM packages

   ```sh
     npm install
   ```

### Setup Environment Variables

1. Create a `.env` or `.env.local` file in your local root directory.

2. Add the following variables to the `.env` or `.env.local` file:

   ```sh
     NEXT_PUBLIC_URL=your_api_url
   ```

## Usage

This application is a portfolio that inspired from this [Figma template](https://www.figma.com/design/SUbBTYCq1e4ngRt20lSdqr/Food-Recipe?node-id=47-1273&t=zKQHFrZI17X3NJUQ-0). The programming used in this application is Next.js with React components utilizing router pages. Additionally, I used Tailwind as CSS Framework, with enhancements such as [clsx](https://www.npmjs.com/package/clsx) and ESLint to improve efficiency and maintain code consistency. I also used [Axios](https://axios-http.com/docs/intro) for API calls, while [date-fns](https://date-fns.org/) and [js-cookie](https://github.com/js-cookie/js-cookie) manage date handling and cookies. For developing my authentication and other validations, I used Yup for schema validation. Lastly, Redux is implemented for state management, completing the overall project of this application.

<!-- ### Features -->

### Screenshots

For more details, feel free to check in show/hide images below.

<details>
  <summary>Show/Hide Images</summary>
  <br>
  <table>
   <tr>
      <th>Login Page</th>
   </tr>
   <tr>
      <td><img src="./public/screenshots/Login.png" alt="Login Page" width="100%"/></td>
  </tr>
   <tr>
      <th>Register Page</th>
   </tr>
   <tr>
      <td><img src="./public/screenshots/Register.png" alt="Register Page" width="100%"/></td>
  </tr>
   <tr>
      <th>Home Page</th>
   </tr>
   <tr>
      <td><img src="./public/screenshots/Home.png" alt="Home Page" width="100%"/></td>
  </tr>
   <tr>
      <th>Browse Page</th>
   </tr>
   <tr>
      <td><img src="./public/screenshots/Browse.png" alt="Browse Page" width="100%"/></td>
  </tr>
   <tr>
      <th>Detail Recipe Page</th>
   </tr>
   <tr>
      <td><img src="./public/screenshots/Detail Recipe.png" alt="Detail Recipe Page" width="100%"/></td>
  </tr>
   <tr>
      <th>Add Recipe Page</th>
   </tr>
   <tr>
      <td><img src="./public/screenshots/Add Recipe.png" alt="Add Recipe Page" width="100%"/></td>
  </tr>
   <tr>
      <th>Profile Page</th>
   </tr>
   <tr>
      <td><img src="./public/screenshots/Profile.png" alt="Profile Page" width="100%"/></td>
  </tr>
</table>
</details>

<!-- 1.  Login Page

    <details>
       <summary>Show/Hide Image</summary>
       <br>
       <img src="./public/screenshots/Login.png" alt="Login Page">
    </details>

2.  Register Page

    <details>
       <summary>Show/Hide Image</summary>
       <br>
       <img src="./public/screenshots/Register.png" alt="Register Page">
    </details>

3.  Home Page

    <details>
       <summary>Show/Hide Image</summary>
       <br>
       <img src="./public/screenshots/Home.png" alt="Landing Page">
    </details>

4.  Browse Page

    <details>
       <summary>Show/Hide Image</summary>
       <br>
       <img src="./public/screenshots/Browse.png" alt="Browse Page">
    </details>

    In this page, there are features:

    - Search Bar

      <details>
         <summary>Show/Hide Image</summary>
         <br>
         <img src="./public/screenshots/Browse-Search.png" alt="Browse Page">
      </details>

    - Sort & Order (Filter)

      <details>
         <summary>Show/Hide Image</summary>
         <br>
         <img src="./public/screenshots/Browse-Sort&Order.png" alt="Browse Page">
      </details>

    - Pagination

      <details>
         <summary>Show/Hide Image</summary>
         <br>
         <img src="./public/screenshots/Browse-Pagination.png" alt="Browse Page">
      </details>

5.  Detail Recipe Page

    <details>
       <summary>Show/Hide Image</summary>
       <br>
       <img src="./public/screenshots/Detail Recipe.png" alt="Detail Recipe Page">
    </details>

6.  Add Recipe Page

    <details>
       <summary>Show/Hide Image</summary>
       <br>
       <img src="./public/screenshots/Add Recipe.png" alt="Add Recipe Page">
    </details>

7.  Profile Page

    <details>
       <summary>Show/Hide Image</summary>
       <br>
       <img src="./public/screenshots/Profile.png" alt="Profile Page">
    </details> -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/harbanery/mama-food-recipe-app/blob/main/LICENSE) for more information.

## Contact

If you have any questions or inquiries regarding this project, feel free to contact me at ryusuf05@gmail.com

## Acknowledgements

Feel free to check it out:

<!-- - [Node.js](https://nodejs.org/en) -->
<!-- - [React Dom Router](https://reactrouter.com/en/main) -->

- [React Icons](https://react-icons.github.io/react-icons/)
- [Vercel as Deployment](https://vercel.com/)
- [Img Shields](https://shields.io)
- [Choose an Open Source License](https://choosealicense.com/)
- [GitHub Pages](https://pages.github.com/)

<!-- MARKDOWN LINKS & IMAGES -->

[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://reactjs.org/
[Tailwind]: https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Redux]: https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
