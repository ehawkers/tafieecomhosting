import "./blog_grid_page.css";
import { Link } from "react-router-dom";
import resourcepage1 from "../../assets/resourcecenter1.png";
import { useFetch } from "../../hooks/api_hook";
import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../pages/header/header";
import Footer from "../../pages/footer/footer";
import AllCategoryComponent from "../../components/allcategory/allcategory";

const BlogPage = () => {
  const { data: blogs } = useFetch("/api/blogs");
  const [searchField, setSearchField] = useState("");
  const { data: recentBlogs } = useFetch("/api/recentBlogs");
  const [searchBlogs, setSearchBlog] = useState([]);

  const search = async (text) => {
    if (text !== "") {
      const { data } = await axios.post(
        `http://localhost:8080/api/searchBlog`,
        {
          search: text,
        }
      );
      setSearchBlog(data.data);
    } else {
      setSearchBlog(undefined);
    }
  };

  useEffect(() => {
    search(searchField);
  }, [searchField]);
  return (
    <div>
      <Header />

      <div className="blogpage">
        <div className="blog-tile">
          <div className="blog-grid-page row">
            <div className="tile-circle"></div>
            <div className="tile_title col-5">
              <div className="title-text">
                <div>
                  <h3>Welcome to</h3>
                </div>
                <div className="tafi-resource">
                  <h1>
                    <span>TAFI RESOURCE</span>
                  </h1>
                </div>
                <div className="center">
                  <h1>
                    <span>CENTER</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="tile_image col-7"></div>
          </div>
        </div>
        <div className="below-blog-tile-header">
          <div className="filter-region">
            <div></div>
            <div className="search-bar">
              <input
                type="text"
                id="text-blog"
                name="search"
                onChange={(e) => setSearchField(e.target.value)}
                className="search_container"
              />
              <div className="search-button">
                <button className="search-icon">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {searchField !== "" && (
          <div className="blog-latest-post">
            <div>
              <h4>Search Posts</h4>
            </div>
            <div className="below-line">
              <div className="below-post"></div>
              <div className="below-post-1"></div>
            </div>
            <div className="latest-post-card row">
              {searchBlogs && searchBlogs.length !== 0 ? (
                searchBlogs?.map((blog) => {
                  return (
                    <div className="card-main col-md-4">
                      <div class="card">
                        <img
                          src={resourcepage1}
                          class="card-img-top"
                          alt="..."
                        />
                        <div class="card-body">
                          <h5 class="card-title">{blog.title}</h5>
                          <p class="card-text">{blog.content}</p>
                          <p class="blog-date">{`${dayjs(blog.createdAt).format(
                            "MMMM D, YYYY"
                          )}`}</p>
                          <Link
                            to={`/singleBlog/${blog._id}`}
                            class="btn btn-read"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h4>No Results Found</h4>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="blog-latest-post">
          <div>
            <h4>Latest Posts</h4>
          </div>
          <div className="below-line">
            <div className="below-post"></div>
            <div className="below-post-1"></div>
          </div>
          <div className="latest-post-card row">
            {recentBlogs &&
              recentBlogs?.map((blog) => {
                return (
                  <div className="card-main col-md-4">
                    <div class="card">
                      <img src={resourcepage1} class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h5 class="card-title">{blog.title}</h5>
                        <p class="card-text">{blog.content}</p>
                        <p class="blog-date">{`${dayjs(blog.createdAt).format(
                          "MMMM D, YYYY"
                        )}`}</p>
                        <Link
                          to={`/singleBlog/${blog._id}`}
                          class="btn btn-read"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="blog-most-viewed">
          <div className="blog-most-viewed-text">
            <div className="most-viewed">
              <h2>
                <span>Most Viewed</span> by the people
              </h2>
            </div>
          </div>
          <div className="most-viewed-cards">
            <div className="most-viewed-post-card row">
              {blogs &&
                blogs.slice(0, 3)?.map((blog) => {
                  return (
                    <div className="card-main col-md-4">
                      <div class="card">
                        <img
                          src={resourcepage1}
                          class="card-img-top"
                          alt="..."
                        />
                        <div class="card-body">
                          <h5 class="card-title">{blog.title}</h5>
                          <p class="card-text">{blog.content}</p>
                          <p class="blog-date">{`${dayjs(blog.createdAt).format(
                            "MMMM D, YYYY"
                          )}`}</p>
                          <Link
                            to={`/singleBlog/${blog._id}`}
                            class="btn btn-read"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="blog-all-post">
          <div>
            <h4>All Posts</h4>
          </div>
          <div className="below-line">
            <div className="below-post"></div>
            <div className="below-post-1"></div>
          </div>
          <div className="all-post-card row ">
            {blogs &&
              blogs?.map((blog) => {
                return (
                  <div className="card-main col-md-4">
                    <div class="card">
                      <img src={resourcepage1} class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h5 class="card-title">{blog.title}</h5>
                        <p class="card-text">{blog.content}</p>
                        <p class="blog-date">{`${dayjs(blog.createdAt).format(
                          "MMMM D, YYYY"
                        )}`}</p>
                        <Link
                          to={`/singleBlog/${blog._id}`}
                          class="btn btn-read"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <div className="view-more">
            <button class="btn btn-read " id="show-more">
              Show More
            </button>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
