console.clear();
import { faker } from "https://esm.sh/@faker-js/faker";

//*******************************
// When post was posted
//*******************************
function whenPosted(randDays) {
  let letter =
    randDays / 365 >= 1
      ? "y"
      : randDays / 31 >= 1
      ? "m"
      : randDays / 7 >= 1
      ? "w"
      : randDays / 1 >= 1
      ? "d"
      : "h";
  let number =
    letter == "y"
      ? Math.floor(randDays / 365)
      : letter == "m"
      ? Math.floor(randDays / 31)
      : letter == "w"
      ? Math.floor(randDays / 7)
      : letter == "d"
      ? Math.floor(randDays / 1)
      : Math.ceil(Math.random() * 23);
  let daysElapsed = `${number} ${letter}`;
  return daysElapsed;
}
//*************** WHEN COMMENT WAS POSTED ***************
function whenCommentPosted(randDays) {
  let randDaysSinceComment = Math.floor(Math.random() * randDays);
  let letter =
    randDaysSinceComment / 365 >= 1
      ? "y"
      : randDaysSinceComment / 31 >= 1
      ? "m"
      : randDaysSinceComment / 7 >= 1
      ? "w"
      : randDaysSinceComment / 1 >= 1
      ? "d"
      : "h";
  let number =
    letter == "y"
      ? Math.floor(randDaysSinceComment / 365)
      : letter == "m"
      ? Math.floor(randDaysSinceComment / 31)
      : letter == "w"
      ? Math.floor(randDaysSinceComment / 7)
      : letter == "d"
      ? Math.floor(randDaysSinceComment / 1)
      : Math.ceil(Math.random() * 23);
  let daysElapsed = `${number} ${letter}`;
  return daysElapsed;
  // return `Time elapsed: ${daysElapsed}, Days since comment: ${randDaysSinceComment}`;
}

//************* CREATE HEADER ***************
function createHeader(randDays) {
  let header = {
    profilePicture: faker.image.urlLoremFlickr({ category: "people" }),
    displayName: faker.internet.displayName(),
    isVerified: faker.datatype.boolean(0.5),
    // isVerified: faker.datatype.boolean(0.03),
    timeAgo: whenPosted(randDays)
  };
  return header;
}
//************* CREATE LIKECOUNT *************
function createLikeCount() {
  let random = Math.floor(Math.random() * 100);
  let range = random > 95 ? "high" : random > 70 ? "medium" : "low";
  let likeCount =
    range == "high"
      ? faker.number.int({ min: 100000, max: 1000000 })
      : range == "medium"
      ? faker.number.int({ min: 1000, max: 99000 })
      : faker.number.int({ min: 0, max: 999 });
  return likeCount;
}
//****************** CREATE COMMENTS *******************
function createComments(randDays, no = 2) {
  let comments = [];
  for (let i = 0; i < no; i++) {
    let sentence = `This is ${faker.word.adjective()} - ${faker.word.interjection()}!`;
    let comment = {
      profilePicture: faker.image.urlLoremFlickr({ category: "people" }),
      displayName: faker.internet.displayName(),
      isVerified: faker.datatype.boolean(0.5),
      comment: sentence,
      timeAgo: whenCommentPosted(randDays),
      likes: createLikeCount()
    };
    comments.push(comment);
  }
  return comments;
}

//***************** CREATE REACTIONS *******************
function createReactions(randDays) {
  let reactions = {
    likes: createLikeCount(),
    comments: createComments(randDays, 1)
  };
  return reactions;
}

let posts = [];
let post;
function createPosts(no = 2) {
  for (let i = 0; i < no; i++) {
    let randDays = Math.floor(Math.random() * 40);
    post = {
      header: createHeader(randDays),
      post: faker.image.urlLoremFlickr(),
      reactions: createReactions(randDays)
      // comments: createComments(2)
    };
    posts.push(post);
  }
  return posts;
}
console.log(createPosts(2));

//*******************************************************
//****** HELPER FUNCTIONS TO CONVERT JS TO HTML *********
//*******************************************************
function _(itemToSelect) {
  return document.querySelector(itemToSelect);
}

function $$(tag, text) {
  let element = document.createElement(tag);
  if (text) {
    element.innerText = text;
  }
  return element;
}

//*******************************************************
// Querying DOM to select parent elements
//*******************************************************
const headerData1 = _(".header-data-1");
const headerData2 = _(".header-data-2");
const svgContainer = _(".svg-container");
const postData = _(".post-data");
const likesSpan = _(".likes-span");
const commentTextDiv = _(".comment-text");
const commentAuthorDiv = _(".comment-author");
const commentAuthorVerification = _(".comment-author-verification");
  const noOfComments = _(".no-of-comments");

//******* CREATING HTML IN HEADER DATA SECTION *********
posts.forEach((post) => {
  //PROFILE PICTURE
  const profilePicture = $$("img");
  profilePicture.src = post.header.profilePicture;
  headerData1.appendChild(profilePicture);
  profilePicture.setAttribute("class", "profile-picture");

  //USERNAME
  const displayName = $$("p", `${post.header.displayName}`);
  headerData1.appendChild(displayName);
  displayName.setAttribute("class", "display-name");

  // VERIFIED TICK FOR POST AUTHOR - HTML

  post.header.isVerified == true
    ? svgContainer.classList.remove("hide")
    : svgContainer.classList.add("hide");

  //WHEN POST WAS MADE - HTML
  const timeAgo = $$("p", `${post.header.timeAgo}`);
  headerData2.appendChild(timeAgo);
  displayName.setAttribute("class", "display-name");

  //POST DATA - HTML

  const postContent = $$("img");
  postContent.src = `${post.post}`;
  postContent.setAttribute("class", "post-content");
  postData.appendChild(postContent);

  // LIKES - HTML
  const likes = $$("span", `${post.reactions.likes}`);
  likesSpan.appendChild(likes);

  // COMMENTS - HTML
  // let firstTwoComments = []
  // firstTwoComments.push(post.reactions.comments[0])
  // firstTwoComments.push(post.reactions.comments[1])
  // console.log(firstTwoComments)
  post.reactions.comments.forEach((comment) => {
    //adding commentor's display name

    const commentAuthorSpan = $$("span", `${comment.displayName}`);
    commentAuthorSpan.setAttribute("class", "comment-author");
    commentAuthorDiv.appendChild(commentAuthorSpan);

    // VERIFIED TICK FOR COMMENT AUTHOR - HTML
    
    comment.isVerified == true
      ? commentAuthorVerification.classList.remove("hide")
      : commentAuthorVerification.classList.add("hide");

    // COMMENT TEXT HTML
    
    const commentTextSpan = $$("span", `${comment.comment}`);
    // commentAuthorSpan.setAttribute("class", "comment-author");
    commentTextDiv.appendChild(commentTextSpan);
  });

  //View more comments html

  noOfComments.innerText = post.reactions.comments.length;
});
//adding commentor's profile image - not required
//  const commentProfilePic = $$("img");
// commentProfilePic.src = `${comment.profilePicture}`;
// commentProfilePic.setAttribute("class", "comment-profile-pic");
// div.appendChild(commentProfilePic);
