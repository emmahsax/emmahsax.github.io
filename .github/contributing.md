# Contributing

### Table of Contents

* [Contribution Process](#contribution-process)
* [Running Locally](#running-locally)
* [Brand and Site Colors](#brand-and-site-colors)
* [HTML Proofer](#html-proofer)
* [Markdown Linter](#markdown-linter)
* [Rubocop](#rubocop)
* [Javascript Linter](#javascript-linter)
* [Continuous Integration](#continuous-integration)
  * [Tests](#tests)
  * [Deployments](#deployments)
* [Jekyll Configuration](#jekyll-configuration)
* [Site Pages](#site-pages)
  * [Nested Pages](#nested-pages)
* [Blog Posts Collection](#blog-posts-collection)
  * [Posts with and without Tags](#posts-with-and-without-tags)
  * [Posts in a Category](#posts-in-a-category)
  * [Writing Drafts](#writing-drafts)
  * [Tables of Contents](#tables-of-contents)
* [LEGO Collection](#lego-collection)
* [Assets](#assets)
  * [CSS](#css)
  * [JS](#js)
  * [Images](#images)
    * [PhotoSwipe](#photoswipe)
    * [Lightbox2](#lightbox2)
    * [Notes for Lightbox2 and PhotoSwipe](#notes-for-lightbox2-and-photoswipe)
  * [Resources](#resources)

## Contribution Process

1. Fork this repository: [https://github.com/emmahsax/emmahsax.github.io/fork](https://github.com/emmahsax/emmahsax.github.io/fork).
2. Triple check you're currently on the `main` branch.
3. Make your changes on a feature branch:

  | With GitHub UI | On your computer with Git |
  |----------------|---------------------------|
  | Make your first change. | Make sure you have this repository cloned to your machine and then create your feature branch. <br>`git checkout -b my-new-feature-branch` |
  | When you're ready to commit your first change, make a new branch and name it appropriately. | Make your first few changes. |
  | Click that green `Commit changes` button. | Commit and push your changes.<br>`git commit -am "Add some feature" && git push` |
  | Make a new pull request for your new feature branch to your fork's `main` branch (GitHub UI should automatically direct you to do this). | Continue making changes and committing/pushing them (unless you leave your feature branch, all new commits will be automatically added to your branch). |
  | Continue making changes to your pull request/branch (navigate to the main repository page, switch to your feature branch, and then continue making whatever changes you'd like). | When you're satisfied, make a pull request for your fork's feature branch to your fork's `main` branch in the GitHub UI. |

4. Verify tests passes on your pull request. The test configuration lives inside the [`.github/workflows/main.yml`](https://github.com/emmahsax/emmahsax.github.io/blob/main/.github/workflows/main.yml) file. Read more about this repository's tests below.
5. Check the site looks like how you expect it to look. Follow the instructions below to get your computer running the site locally. If you've been working on GitHub UI up until this point, you may need to switch over to a computer and clone the repository and branch to do this.
6. When you're absolutely ready for me to look at your changes, please create a pull request between your fork's feature branch and this repository's `main` branch.

Happy coding! ????

## Running Locally

To run this application locally, following these steps:

1. Be sure you have Ruby installed on your machine; use whichever version the `.ruby-version` file specifies.
2. First, bundle install and install all of the gems specified in the Gemfile:

    ```bash
    gem install bundler
    bundle install
    ```

3. Then build and serve the site using Jekyll:

    ```bash
    bundle exec jekyll serve
    ```

4. Navigate to the local URL Jekyll provides (`http://127.0.0.1:4000` on my machine).

To view Disqus comments and comment loading locally, run Jekyll in the `production` environment (local development, where the environment is automatically `development`, does not show comments):

```bash
JEKYLL_ENV=production bundle exec jekyll serve
```

NOTE: Running this process locally will most likely create at least one directory locally on your machine, such as `_site/` and `.sass-cache/`, and potentially others. All of these are already in the `.gitignore`, but feel free to add others as necessary.

## Brand and Site Colors

* Blue: ![#001aaf](https://via.placeholder.com/15/001aaf/000000?text=+) `#001aaf`
* White: ![#ffffff](https://via.placeholder.com/15/ffffff/000000?text=+) `#ffffff`
* Dark Grey: ![#4c565a](https://via.placeholder.com/15/4c565a/000000?text=+) `#4c565a`
* Light Grey: ![#f3f6fa](https://via.placeholder.com/15/f3f6fa/000000?text=+) `#f3f6fa`
* Orange: ![#f88e02](https://via.placeholder.com/15/f88e02/000000?text=+) `#f88e02`
* Red: ![#d61b1b](https://via.placeholder.com/15/d61b1b/000000?text=+) `#d61b1b`

## HTML Proofer

We can check periodically that all of the HTML links in this website load correctly with [HTML Proofer](https://github.com/gjtorikian/html-proofer):

```bash
JEKYLL_ENV=production bundle exec jekyll build
bin/html_proofer.sh
```

If you're in the process of creating a new blog post, then most likely the external link to the new blog post will fail. This makes sense???the blog post isn't live online yet, and that's what the link is checking for.

GitHub Actions also runs a version of the HTML Proofer which skips over all internal domains. GitHub Actions runs this step after building, just verifying that links are accurate. We set it to `continue-on-error` though, so developers should make it a habit to check out its results every so often.

## Markdown Linter

This project uses the [MarkdownLint](https://github.com/markdownlint/markdownlint) on its Markdown files. There are specific linter [rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) that I've carefully chosen to omit (because they simply don't fit my Markdown style), and so to run the linter with my rules, run this script:

```bash
bin/markdown_linter.sh
```

Note that the linter specifically passes in directories and files to evaluate, so if you create any new Markdown files, you'll have to add them to `bin/markdown_linter.sh`.

GitHub Actions also runs the same `bin/markdown_linter.sh` script on each test run.

## Rubocop

This project uses [Rubocop](https://github.com/rubocop-hq/rubocop) to check its Ruby files. To run Rubocop locally, run:

```bash
bundle exec rubocop
```

GitHub Actions also runs Rubocop on each test run.

## Javascript Linter

This project uses the Javascript [Standard Linter](https://standardjs.com/). To install this linter, install Node and NPM:

```bash
brew install node
npm install
```

And then, you can run the script:

```bash
npm install standard --save-dev && bin/javascript_linter.sh
```

GitHub Actions also runs the same `bin/javascript_linter.sh` script on each test run. We set it to `continue-on-error` though, so developers should make it a habit to check out its results every so often.

## Continuous Integration

This repository uses GitHub Actions for continuous integration tools. See the full workflows [here](https://github.com/emmahsax/emmahsax.github.io/blob/main/.github/workflows).

### Tests

This repository doesn't really have any unit or integration tests (Jekyll sites are just a host of static site files, so there's not really any functionality to test). However, GitHub Actions does check that Bundler can install the necessary dependencies and that Jekyll can properly build the site on each pull request and each commit to the `main` branch (the default branch in this repository). The tests are also run on a weekly cron (on Monday mornings) as a way of testing that the building continues to function as expected.

### Deployments

Because of the use of Jekyll gems that GitHub Pages doesn't support, this site needs to use a "3rd party" instead of GitHub Pages to compile the code. So, when GitHub Actions runs on the `main` branch, not only does it bundle all of the dependencies and build the site, but it also puts it into a special `./_site` directory. Then, GitHub Actions will run a "deployment" to GitHub Pages to upload that directory to the `gh-pages` branch of this GitHub repository. Then, GitHub Pages automatically deploys the commits in the `gh-pages` branch. In this way, we develop the site on a pull request, we merge pull request into the `main` branch, and then GitHub Actions builds the code and commits that automagically to the `gh-pages` branch. Then GitHub Pages does their thing.

A full deployment (including GitHub Actions and GitHub Pages) only takes about five to ten minutes, but depending on what was changed (HTML files, images, etc), it can take up to about fifteen minutes to propagate the changes. To make the changes appear faster, you can reload the entire website in incognito mode.

## Jekyll Configuration

This website builds and runs with the help of Jekyll. All of the configurations for this project live in a file in the root: `_config.yml`. The `_` indicates to Jekyll that this is a special directory/file that Jekyll should not include in the final build and should evaluate. Each time this file is changed, we must restart our local Jekyll server to get the new changes.

## Site Pages

The files in the `pages/` directory are the general pages in the top navigation bar of the site, and they're for the main content of the site. They're written in Markdown, but Jekyll and Liquid will use the Markdown content to make HTML files. The front matter of any Markdown/HTML file specifies the settings of the page:

```yml
---
layout: page # the layout HTML to use (required for almost every page)
title: Page 01 # the title of this page (optional if the page is NOT in the nav bar)
order: 3 # the order of this page in the navigation bar (delete if the page is NOT in the nav bar)
permalink: /page-01/ # the static link this page should have (required for EACH page in this directory)
---
```

You can also specify custom settings that you want the page to have:

```yml
---
custom_field_1: true
custom_field_2: useful_string
---
```

Then, you can reference those custom settings on other HTML files (such as the layout the page is using... ????):

```
{{ page.custom_field_1 }}
=> true
{{ page.custom_field_2 }}
=> useful_string
```

### Nested Pages

This site has two kinds of nested pages. One of them is Interests and Hobbies pages. These live in `pages/interests-and-hobbies/`. They are placed here for organizational purposes, so users can see that these pages branch off of the Interests and Hobbies page. One of these pages' front matter would look like this:

```yml
---
layout: page
title: Nested Page
permalink: /interests-and-hobbies/nested-page/
---
```

The other kind of nested pages are blog paginated pages. This site uses [`jekyll-paginate-v2`](https://github.com/sverrirs/jekyll-paginate-v2/) to do it's pagination of the blog posts. The first index blog page we paginate is `pages/blog.md`. The front matter of this file is sort of repetitive, but by specifying titles and URLs, we are able to have more flexibility with our directory structure.

But in addition to that page, we also paginate the `tag` and `category` filtered pages, which live in `pages/blog/`. In this directory, each `tag` and `category` needs to have its own page. A `tag` should be one word, and should not require camelcase or capitalization, ex: `"tag1"` or `"tag"`. An example would be `pages/blog/tag1.md`.

For a tag, the front matter should look like this:

```yml
---
layout: blog
permalink: /blog/tag1/
pagination:
  enabled: true
  collection: blog_posts
  permalink: /:num/
  title: Tag1
  tag: tag1
---
```

A `category` _can_ be multiple words, and can require capitalization like a title, ex: `"Category One"` or `"Category Two"`. For a `category`, the front matter should look like this:

```markdown
---
layout: blog
permalink: /blog/category-one/
pagination:
  enabled: true
  collection: blog_posts
  permalink: /:num/
  title: Category One
  category: Category One
---

Some words describing this category should go here.
```

## Blog Posts Collection

This section references the blog post data... the content of each post.

There's two ways of sorting blog posts. The first way is with a `tag`. A blog post can have as many tags as desired, and each tag has its own page with all posts with that tag. The second way is with a `category`. A blog post can only be a part of a single category, so it makes sense for the small group of blog posts that are all related with a single theme. Each category also has its own page. A user of the site will view the category of posts no differently than posts with tag(s). Currently, the code is not set up to handle posts that are part of a category _and_ contain tags.

### Posts with and without Tags

Most of the posts can just go into the general `_blog_posts/` directory, written as Markdown files. For a generic post, the front matter could look like this:

```yml
---
layout: post
title: Post A
tags: [ tag1, tag2 ] # optional
permalink: /blog/posts/post-a
date: 2001-12-14 00:00:00 -0600 # 2001-12-14 06:00:00 UTC
---
```

The tags determine how we want to categorize each post. If there's no categorization of a post (if it's completely random), then there's no need to specify any tag(s), AKA just leave the line completely out of the front matter. But, if you think the post is a good contestant for a tag, such as `tag1` or `tag2` in our example, then add those appropriate tags in a list format, as shown above.

Without the `permalink` link in the front matter, the URL will most likely default to including the publishing date. This is not ideal, so instead, we'll set a custom permalink for each blog post.

The `date` front matter indicates the published date and time. Usually, it's totally fine with blog posts being published at midnight (usually in America/Central time zone, because that's where Minnesota is). On rare occasions when two posts are published on the same date, it's important to specify a time so they sort properly. The entire site will show in a readers' local time, but the data will be stored in the system (and will be reflected in the `feed.xml` and `sitemap.xml`) in UTC. From a human's perspective, we want time zones to be a non-issue, so we can write our date/time as the author is seeing it within the post. For Jekyll to properly interpret it, we must specify the author's current hour offset from UTC at the time of publishing.

### Posts in a Category

If I'm going to write a group of posts that all have a common theme, they can each go into a new nested directory: `_blog_posts/category-one/`, and should make use of the `title` and `subtitle` metadata, where the `title` is the name of the `category`, and the `subtitle` is the title of that specific post:

```yml
---
layout: post
title: Category One
subtitle: Post A
category: Category One
permalink: /blog/posts/category-one/post-a
date: 2001-06-27 20:30:00 -0500 # 2001-06-28 01:30:00 UTC
---
```

### Writing Drafts

To write drafts, make a new file in the `_blog_posts/` directory (or in a subdirectory if the post will be part of a category). The new file should be named in the following pattern: `test-post-title.md`.

To the front matter, make sure to add the `layout`, `title`, and `permalink` (`subtitle`, `category`, and `tags` are all optional). Add the following front matter to the new blog post draft:

```yml
---
layout: post
title: Test Post Title
permalink: /blog/posts/test-post-title/
draft: true
---
```

Optionally add `subtitle`, `category`, and `tags` to the front matter. Now, when you run `jekyll serve` locally, the draft post(s) should appear at the top of the list of posts, and should show as "Unpublished."

When it's time to publish the post, you can either:

* Publish the post now:
  * Remove the `draft: true` front matter
  * Add the current date/time (in the author's local time zone, properly identifying the current hour offset from UTC) to the front matter: `date: YYYY-MM-DD HH:MM:SS -0X00`
  * Re-add and commit that file to the pull request
  * Wait for all status checks to pass on the pull request
  * Merge the pull request into the `main` branch
* Publish the post on a future date:
  * Remove the `draft: true` front matter
  * Add the current date/time (in the author's local time zone, properly identifying the current hour offset from UTC) to the front matter: `date: YYYY-MM-DD HH:MM:SS -0X00`
  * Re-add and commit that file to the pull request
  * Wait for all status checks to pass on the pull request
  * Add a comment to the pull request with the publishing date/time in UTC:

    ```
    # example (May 18, 2020 at 17:58 UTC):
    @prscheduler 2020-05-18 17:58

    @prscheduler YYYY-MM-DD HH:MM
    ```

  * Wait for the `pr-scheduler` to respond saying the merge was scheduled
  * Now, the PR Merger will automatically merge your pull request at the time specified in the pull request; GitHub Actions will then trigger a build and deploy of your changes

To identify the current hour offset from UTC, look up the time zone offset based on your location [here](https://www.timeanddate.com/time/zone/).

### Tables of Contents

Write a Markdown-style TOC of each header that should be in the TOC. Add the TOC to the top of the blog post. Then add the anchors the blog post, (making the headers of the blog post linkable).

```markdown
<div id="anchor">
  <a id="the-link-id">&nbsp;</a>

## The Header Goes Here
</div>
```

Note that the empty line in the middle and lack of tabs or spaces before the header are important.

## LEGO Collection

This section references the LEGO data... each LEGO set/MOC individually.

The `_lego/` directory is a collection of different LEGO sets and MOCs that I've written. My special LEGO page (which is only linked from the "Interests & Hobbies" page), loops through all of the LEGO entries. The front matter layout of one of these entries looks like this:

```yml
---
layout: lego
title: Cool LEGO Title
date: 2020-05-29 00:00:00 -0500  # 2020-05-29 05:00:00 UTC
---
```

With the LEGO entries, it matters less exactly what date is presented, since the page never shows the date to the readers of the site. The dates are only there for sorting.

## Assets

This directory has four directories, `css/`, `js/`, `images/`, and `resources/`.

### CSS

The `css/` directory contains all of the CSS files in this site. They're all called together in `style.scss`. The CSS in the project is loaded inside the `_includes/head.html`. This site also uses [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/) for a lot of its CSS, including the navigation bar, headers, responsive page, etc.

### JS

The `js/` directory is where we store all of our Javascript files for the site. Some of them are called at the bottom of every page. Others are called in specific places in the code. The other Javascript files are directly copy-pasted by 3rd party sources online. They're hard-coded into the site to avoid potential dependency breaks later.

### Images

The `images/` directory gives me a place to store all of the images this site uses. To call a specific image, you can ask for it in HTML:

```html
<div>
  <img class="image photo" src="/assets/images/picture-01.jpg" alt="Picture 1">
</div>
```

Yes, both the `image` and `photo` classes would be required.

#### PhotoSwipe

Alternatively, to use PhotoSwipe to make the photo clickable, and then it'll zoom for the user and create a gallery, you can call the photo `_include`:

<details><summary>PhotoSwipe Setup</summary>

```html
<div class="photoswipe-gallery">
  {% include elements/photo.html
      url="/assets/images/picture-01.jpg"
      thumb_width="200" thumb_height="230
      full_width="400" full_height="200"
      caption="Caption will show when the photo is enlarged" alt="Alt shows if the photo cannot be shown"
  %}
</div>
```

</details>

To create a "nested" PhotoSwipe gallery (where one gallery sites _inside_ a larger gallery), please view the examples below:

<details><summary>Nested PhotoSwipe Gallery Markdown Example</summary>

```html
Here's the "surrounding" PhotoSwipe gallery with pictures of an alpaca, bobcat, chipmunk, dolphin, ermine, and fox:

<div class="photoswipe-gallery"> <!-- This is the start of the "surrounding" gallery -->
  <div class="text-center">
    {% include elements/photo.html
        url="https://i.imgur.com/Y3ibubf.jpg"
        thumb_height="225" caption="Alpaca"
        full_width="720" full_height="960"
    %}
    {% include elements/photo.html
        url="https://i.imgur.com/8K0L9VU.jpg"
        thumb_height="225" caption="Bobcat"
        full_width="1600" full_height="1200"
    %}
    {% include elements/photo.html
        url="https://i.imgur.com/Sd4hAvW.jpg"
        thumb_height="225" caption="Chipmunk"
        full_width="1280" full_height="852"
    %}
  </div>

Here's an "inner" PhotoSwipe gallery. The photos in the "inner" gallery _are not_ included in the "surrounding" gallery. And photos from the "surrounding" gallery _are not_ included in the "inner" gallery.

The pictures in the "inner" gallery include pictures of a zebu, yak, and xerus:

  <div class="text-center inner-photoswipe-gallery"> <!-- This is the start of the "inner" gallery -->
    {% include elements/photo.html
        url="https://i.imgur.com/WNa7Bxx.jpg"
        thumb_height="80" caption="Zebu"
        full_width="1180" full_height="520"
        child_selector_class="inner-photoswipe"
    %}
    {% include elements/photo.html
        url="https://i.imgur.com/nR8jJEM.jpeg"
        thumb_height="80" caption="Yak"
        full_width="5184" full_height="3456"
        child_selector_class="inner-photoswipe"
    %}
    {% include elements/photo.html
        url="https://live.staticflickr.com/65535/51222953803_bb61bb4368_b.jpg"
        thumb_height="80" caption="Xerus"
        full_width="1000" full_height="667"
        child_selector_class="inner-photoswipe"
    %}
  </div> <!-- This is the end of the "inner" gallery -->

And now we're back to the "surrounding" gallery:

  <div class="text-center">
    {% include elements/photo.html
        url="https://i.imgur.com/pk5308U.jpg"
        thumb_height="225" caption="Dolphin"
        full_width="530" full_height="765"
    %}
    {% include elements/photo.html
        url="https://i.imgur.com/wdg3S.jpg"
        thumb_height="225" caption="Ermine"
        full_width="316" full_height="474"
    %}
    {% include elements/photo.html
        url="https://i.imgur.com/1VkY1R4.jpg"
        thumb_height="225" caption="Fox"
        full_width="540" full_height="405"
    %}
  </div>
</div> <!-- This is the end of the "surrounding" gallery -->

<script
  src="/assets/js/activate_photoswipe.js"
  type="module"
  class="photoswipe-activation"
  gallery-selector=".inner-photoswipe-gallery"
  child-selector=".inner-photoswipe"
></script>
```

</details>

<details><summary>Nested PhotoSwipe Gallery HTML Example</summary>

```html
<p>Here???s the ???surrounding??? PhotoSwipe gallery with pictures of an alpaca, bobcat, chipmunk, dolphin, ermine, and fox:</p>

<div class="photoswipe-gallery"> <!-- This is the start of the "surrounding" gallery -->
  <div class="text-center">
    <a class="photoswipe" href="https://i.imgur.com/Y3ibubf.jpg" target="_blank" data-pswp-width="720" data-pswp-height="960">
      <img class="image" src="https://i.imgur.com/Y3ibubf.jpg" width="170" alt="Alpaca">
      <div class="invisible caption">Alpaca</div>
    </a>
    <a class="photoswipe" href="https://i.imgur.com/8K0L9VU.jpg" target="_blank" data-pswp-width="1600" data-pswp-height="1200">
      <img class="image" src="https://i.imgur.com/8K0L9VU.jpg" width="300" alt="Bobcat">
      <div class="invisible caption">Bobcat</div>
    </a>
    <a class="photoswipe" href="https://i.imgur.com/Sd4hAvW.jpg" target="_blank" data-pswp-width="1280" data-pswp-height="852">
      <img class="image" src="https://i.imgur.com/Sd4hAvW.jpg" width="340" alt="Chipmunk">
      <div class="invisible caption">Chipmunk</div>
    </a>
  </div>

  <p>Here???s an ???inner??? PhotoSwipe gallery. The photos in the ???inner??? gallery <em>are not</em> included in the ???surrounding??? gallery. And photos from the ???surrounding??? gallery <em>are not</em> included in the ???inner??? gallery.</p>

  <p>The pictures in the ???inner??? gallery include pictures of a zebu, yak, and xerus:</p>

  <div class="text-center inner-photoswipe-gallery"> <!-- This is the start of the "inner" gallery -->
    <a class="inner-photoswipe" href="https://i.imgur.com/WNa7Bxx.jpg" target="_blank" data-pswp-width="1180" data-pswp-height="520">
      <img class="image" src="https://i.imgur.com/WNa7Bxx.jpg" width="150" alt="Zebu">
      <div class="invisible caption">Zebu</div>
    </a>
    <a class="inner-photoswipe" href="https://i.imgur.com/nR8jJEM.jpeg" target="_blank" data-pswp-width="5184" data-pswp-height="3456">
      <img class="image" src="https://i.imgur.com/nR8jJEM.jpeg" width="100" alt="Yak">
      <div class="invisible caption">Yak</div>
    </a>
    <a class="inner-photoswipe" href="https://live.staticflickr.com/65535/51222953803_bb61bb4368_b.jpg" target="_blank" data-pswp-width="1000" data-pswp-height="667">
      <img class="image" src="https://live.staticflickr.com/65535/51222953803_bb61bb4368_b.jpg" width="100" alt="Xerus">
      <div class="invisible caption">Xerus</div>
    </a>
  </div> <!-- This is the end of the "inner" gallery -->

  <p>And now we???re back to the ???surrounding??? gallery:</p>

  <div class="text-center">
    <a class="photoswipe" href="https://i.imgur.com/pk5308U.jpg" target="_blank" data-pswp-width="530" data-pswp-height="765">
      <img class="image" src="https://i.imgur.com/pk5308U.jpg" width="155" alt="Dolphin">
      <div class="invisible caption">Dolphin</div>
    </a>
    <a class="photoswipe" href="https://i.imgur.com/wdg3S.jpg" target="_blank" data-pswp-width="316" data-pswp-height="474">
      <img class="image" src="https://i.imgur.com/wdg3S.jpg" width="150" alt="Ermine">
      <div class="invisible caption">Ermine</div>
    </a>
    <a class="photoswipe" href="https://i.imgur.com/1VkY1R4.jpg" target="_blank" data-pswp-width="540" data-pswp-height="405">
      <img class="image" src="https://i.imgur.com/1VkY1R4.jpg" width="300" alt="Fox">
      <div class="invisible caption">Fox</div>
    </a>
  </div>
</div> <!-- This is the end of the "surrounding" gallery -->

<script
  src="/assets/js/activate_photoswipe.js"
  type="module"
  class="photoswipe-activation"
  gallery-selector=".inner-photoswipe-gallery"
  child-selector=".inner-photoswipe"
></script>
```

</details>

#### Lightbox2

Using Lightbox2 in order to make photos clickable is also an option, but this is not recommended (use PhotoSwipe instead).

<details><summary>Lightbox2 Setup</summary>

```html
{% include elements/photo.html
    url="/assets/images/picture-01.jpg"
    thumb_width="200" thumb_height="230
    lightbox_gallery="Lightbox Gallery Name" type="lightbox2"
    caption="Caption will show when the photo is enlarged" alt="Alt shows if the photo cannot be shown"
%}
```

</details>

#### Notes for Lightbox2 and PhotoSwipe

* If a `caption` is given, but not an `alt`, then the `caption` is used as both a caption and an alt. If an `alt` is given, but no `caption`, then there is no caption present on the photo. And if nothing is given, then there's neither a caption nor an alt on the photo.
* The `full_width` and `full_height` represent the pixel sizes of the original image. If neither a `thumb_width` or a `thumb_height` is provided, then the thumb photo will be the same size as the original photo. If both a `thumb_width` and `thumb_height` are provided, then the image will warp to fit both parameters.

### Resources

The `resources/` directory gives me a place to keep PDF documents that are linked in this site. You can put a link to it in Markdown:

```markdown
This is an example sentence, so it will throw a 404. See [here](/assets/resources/resource-01.pdf)?
```

When calling internal resources like this, it'll automatically open in the same tab that the user is currently in. If you wish to open it in a new tab, you'll have to specify that:

```markdown
This is an example sentence, so it will throw a 404. See <a href="/assets/resources/resource-01.pdf" target="_blank">here</a>?
```
