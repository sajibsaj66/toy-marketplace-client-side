import useTitle from "../../hooks/useTitle";

const Blogs = () => {
  useTitle("Blogs");

  return (
    <div className="my-6">
      <h2 className="mb-6 font-sans text-3xl md:text-6xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
        Question And Answerer Section
      </h2>
      <div className="grid md:grid-cols-2 gap-5 ">
        {/* blog 1 */}

        <div className="card  bg-base-100 shadow-xl">
          <div className="card-body text-justify">
            <h2 className="card-title">
              What is an access token and refresh token? How do they work and
              where should we store them on the client-side?
            </h2>
            <div>
              <b>JWT Token:</b>
              <p>
                Access token is a Jwt token that JWT gives us when we are first
                time login if our login was success then jwt gives us tow token
                one is Access Token and another is Refresh Token. Access Token
                usually use when we have to load secure information from
                database that time we add this Access token in Our API headers
                if the Access tacket is valid thn only server give that secure
                dada otherwise it send error;
              </p>
              <p>
                When a Access token is expired then we have to send the server
                Refresh token then server send us valid access Token.
              </p>
              <p>
                When Refresh Token is also Expired then user have to re login
                for generate new access token and refresh token
              </p>
              <p>
                We store Access and Refresh token in client side because we have
                to send them in your api call header froe secure our data from
                unauthorized User.
              </p>
            </div>
          </div>
        </div>
        {/* blog 2 */}
        <div className="card  bg-base-100 shadow-xl">
          <div className="card-body text-justify">
            <h2 className="card-title">Compare SQL and NoSQL databases</h2>
            <h2 className="text-2xl font-medium">SQL:</h2>
            <p>
              The full from of SQL is Structured Query Language. It store data
              in tabular from with fixed Rows and column. It's used in
              relational database. for this reason its decrees the data
              duplication
            </p>
            <h2 className="text-2xl font-medium">No SQL:</h2>
            <p>
              It's highly performed in real time database system. It use JSON
              type data with KEY VALUE pairs table with rows and dynamic
              columns. It is more flexible then SQL Database system.
            </p>
          </div>
        </div>
        {/* blog 3 */}
        <div className="card  bg-base-100 shadow-xl">
          <div className="card-body text-justify">
            <h2 className="card-title">What is express js? What is Nest JS?</h2>
            <p>
              Express js is a Node js Fretwork and Nest Js is also Node js
              Fretwork and it use express js HTTP fretwork by default. And also
              nest js support all that things in express js.
            </p>
          </div>
        </div>
        {/* blog 4 */}
        <div className="card  bg-base-100 shadow-xl">
          <div className="card-body text-justify">
            <h2 className="card-title">
              What is MongoDB aggregate and how does it work?
            </h2>
            <p>
              Mongodb aggregation is a system where we can process our document
              like sort, limit,skip,match etc. Mongo DB aggregation pipeline use
              $ symbol for operation like- $sort, $limit etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
