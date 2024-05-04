"use strict";(self.webpackChunkembla_carousel_docs=self.webpackChunkembla_carousel_docs||[]).push([[7695],{8792:function(e,t,n){n.r(t),n.d(t,{Head:function(){return f},default:function(){return y}});var l=n(1184),a=n(4041),r=n(9103),i=n(8783),c=n(7259);function o(e){const t=Object.assign({h1:"h1",p:"p",a:"a",strong:"strong",pre:"pre",code:"code",hr:"hr",h2:"h2",span:"span"},(0,l.RP)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.h1,null,"Svelte"),"\n",a.createElement(t.p,null,"Embla Carousel provides a wrapper for ",a.createElement(t.a,{href:"https://svelte.dev/"},"Svelte")," that ensures seamless integration of the carousel into your Svelte project and automatic cleanup on component unmount."),"\n",a.createElement(t.p,null,"Start by installing the Embla Carousel ",a.createElement(t.strong,null,"npm package")," and add it to your dependencies."),"\n",a.createElement(r.t,{groupId:c.sk.GROUP_ID},a.createElement(i.O,{tab:c.sk.TABS.NPM},a.createElement(t.pre,null,a.createElement(t.code,{className:"language-shell"},"npm install embla-carousel-svelte --save\n"))),a.createElement(i.O,{tab:c.sk.TABS.YARN},a.createElement(t.pre,null,a.createElement(t.code,{className:"language-shell"},"yarn add embla-carousel-svelte\n")))),"\n",a.createElement(t.hr),"\n",a.createElement(t.h2,{id:"the-component-structure",style:{position:"relative"}},a.createElement(t.a,{href:"#the-component-structure","aria-label":"the component structure permalink",className:"anchor before"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" fill="currentColor" /></svg>'}})),"The component structure"),"\n",a.createElement(t.p,null,"Embla Carousel provides the handy ",a.createElement(t.code,null,"emblaCarouselSvelte")," action for seamless integration with Svelte. A minimal setup requires an ",a.createElement(t.strong,null,"overflow wrapper")," and a ",a.createElement(t.strong,null,"scroll container"),". Start by adding the following structure to your carousel:"),"\n",a.createElement(t.pre,null,a.createElement(t.code,{className:"language-html"},'<script>\n  import emblaCarouselSvelte from \'embla-carousel-svelte\'\n<\/script>\n\n<div class="embla" use:emblaCarouselSvelte>\n  <div class="embla__container">\n    <div class="embla__slide">Slide 1</div>\n    <div class="embla__slide">Slide 2</div>\n    <div class="embla__slide">Slide 3</div>\n  </div>\n</div>\n')),"\n",a.createElement(t.h2,{id:"styling-the-carousel",style:{position:"relative"}},a.createElement(t.a,{href:"#styling-the-carousel","aria-label":"styling the carousel permalink",className:"anchor before"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" fill="currentColor" /></svg>'}})),"Styling the carousel"),"\n",a.createElement(t.p,null,"The element with the classname ",a.createElement(t.code,null,"embla")," is needed to cover the scroll overflow. Its child element with the ",a.createElement(t.code,null,"container")," classname is the scroll body that scrolls the slides. Continue by adding the following ",a.createElement(t.strong,null,"CSS")," to these elements:"),"\n",a.createElement(t.pre,null,a.createElement(t.code,{className:"language-html"},"<style>\n  .embla {\n    overflow: hidden;\n  }\n  .embla__container {\n    display: flex;\n  }\n  .embla__slide {\n    flex: 0 0 100%;\n    min-width: 0;\n  }\n</style>\n")),"\n",a.createElement(t.h2,{id:"accessing-the-carousel-api",style:{position:"relative"}},a.createElement(t.a,{href:"#accessing-the-carousel-api","aria-label":"accessing the carousel api permalink",className:"anchor before"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" fill="currentColor" /></svg>'}})),"Accessing the carousel API"),"\n",a.createElement(t.p,null,"The ",a.createElement(t.code,null,"emblaCarouselSvelte")," action takes the Embla Carousel ",a.createElement(t.a,{href:"/api/options/"},"options")," as part of its parameter. Additionally, you can access the ",a.createElement(t.a,{href:"/api/"},"API")," by using the ",a.createElement(t.code,null,"emblaInit")," event to store the carousel instance in a variable:"),"\n",a.createElement(t.pre,null,a.createElement(t.code,{className:"language-html___highlight={5,7-10,15-16}"},'<script>\n  import emblaCarouselSvelte from \'embla-carousel-svelte\'\n\n  let emblaApi\n  let options = { loop: false }\n\n  function onInit(event) {\n    emblaApi = event.detail\n    console.log(emblaApi.slideNodes()) // Access API\n  }\n<\/script>\n\n<div\n  class="embla"\n  use:emblaCarouselSvelte="{{ options }}"\n  on:emblaInit="{onInit}"\n>\n  <div class="embla__container">\n    <div class="embla__slide">Slide 1</div>\n    <div class="embla__slide">Slide 2</div>\n    <div class="embla__slide">Slide 3</div>\n  </div>\n</div>\n')),"\n",a.createElement(t.h2,{id:"adding-plugins",style:{position:"relative"}},a.createElement(t.a,{href:"#adding-plugins","aria-label":"adding plugins permalink",className:"anchor before"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" fill="currentColor" /></svg>'}})),"Adding plugins"),"\n",a.createElement(t.p,null,"Start by installing the plugin you want to use. In this example, we're going to install the ",a.createElement(t.a,{href:"/plugins/autoplay/"},"Autoplay")," plugin:"),"\n",a.createElement(r.t,{groupId:c.sk.GROUP_ID},a.createElement(i.O,{tab:c.sk.TABS.NPM},a.createElement(t.pre,null,a.createElement(t.code,{className:"language-shell"},"npm install embla-carousel-autoplay --save\n"))),a.createElement(i.O,{tab:c.sk.TABS.YARN},a.createElement(t.pre,null,a.createElement(t.code,{className:"language-shell"},"yarn add embla-carousel-autoplay\n")))),"\n",a.createElement(t.p,null,"The ",a.createElement(t.code,null,"emblaCarouselSvelte")," action parameter accepts ",a.createElement(t.a,{href:"/plugins/"},"plugins"),". Note that plugins need to be passed in an ",a.createElement(t.strong,null,"array")," like so:"),"\n",a.createElement(t.pre,null,a.createElement(t.code,{className:"language-html___highlight={3,6,9}"},'<script>\n  import emblaCarouselSvelte from \'embla-carousel-svelte\'\n  import Autoplay from \'embla-carousel-autoplay\'\n\n  let options = { loop: false }\n  let plugins = [Autoplay()]\n<\/script>\n\n<div class="embla" use:emblaCarouselSvelte="{{ options, plugins }}">\n  <div class="embla__container">\n    <div class="embla__slide">Slide 1</div>\n    <div class="embla__slide">Slide 2</div>\n    <div class="embla__slide">Slide 3</div>\n  </div>\n</div>\n')),"\n",a.createElement(t.p,null,"Congratulations! You just created your first Embla Carousel component."))}var s=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.RP)(),e.components);return t?a.createElement(t,e,a.createElement(o,e)):o(e)},m=n(352),d=n(824),u=n(408),p=n(6169),g=n(8324),h=n(9860),E=n(5455),v=n(3594),b=n(3536);const f=e=>{const{data:t,pageContext:n}=e,{siteUrl:l,author:r}=(0,u.Q)(),{title:i="",description:c,date:o}=t.mdx.frontmatter,s=(0,a.useMemo)((()=>new Date(o+" UTC").toISOString()),[o]);return a.createElement(m.G,{title:i,description:c,url:""+l+n.slug},a.createElement("script",{type:"application/ld+json"},'\n      {\n        "@context": "https://schema.org",\n        "@type": "TechArticle",\n        "name": "'+(0,v.b)(l)+'",\n        "description": "'+c+'",\n        "url": "'+l+n.slug+'",\n        "headline": "'+i+'",\n        "image": "'+l+'/share-image.png",\n        "datePublished": "'+s+'",\n        "dateModified": "'+s+'",\n        "author": {\n          "@type": "Person",\n          "name": "'+r+'"\n        },\n        "publisher": {\n          "@type": "Organization",\n          "name": "'+r+'",\n          "logo": {\n            "@type": "ImageObject",\n            "width": "512",\n            "height": "512",\n            "url": "'+l+d.A+'"\n          }\n        }\n      }\n    '))},_=e=>{const{pageContext:t,children:n}=e,{next:l,previous:r,filePath:i,id:c}=t;return a.createElement(a.Fragment,null,a.createElement(h.Q,{id:c}),a.createElement("article",{id:E.e},a.createElement(b.A,null,n)),a.createElement(p.R,{pageUrl:i}),a.createElement(g.o,{previous:r,next:l}))};function y(e){return a.createElement(_,e,a.createElement(s,e))}},9860:function(e,t,n){n.d(t,{Q:function(){return v}});var l=n(4041),a=n(3057),r=n(7286),i=(n(5483),n(3448)),c=n(3724);var o=n(3214),s=n(6341),m=n(4702),d=n(4393);const u=a.default.nav.withConfig({displayName:"PageBreadcrumbs__PageBreadcrumbsWrapper",componentId:"sc-1mlty1z-0"})(["display:flex;align-items:center;font-size:",";margin-bottom:",";"],m.$.COMPLEMENTARY,d.F.THREE),p=(0,a.css)(["color:",";padding:"," 0;"],s.lm.TEXT_LOW_CONTRAST,d.F.ONE),g=(0,a.default)(r.l).withConfig({displayName:"PageBreadcrumbs__Link",componentId:"sc-1mlty1z-1"})(["",";"],p),h=a.default.span.withConfig({displayName:"PageBreadcrumbs__ActiveTitle",componentId:"sc-1mlty1z-2"})(["",";"],p),E=(0,a.default)(o.I).withConfig({displayName:"PageBreadcrumbs__Separator",componentId:"sc-1mlty1z-3"})(["color:",";margin:0 ",";"],s.lm.TEXT_LOW_CONTRAST,d.F.ONE),v=e=>{const{id:t}=e,n=(e=>{const{flat:t}=(0,c.Y)(),n=t.find((t=>t.id===e));return t.filter((e=>(0,i.Ig)(e.slug,(null==n?void 0:n.slug)||""))).sort(((e,t)=>e.level-t.level))})(t);return 0===n.length?null:l.createElement(u,{"aria-label":"Breadcrumb Navigation"},n.map(((e,t)=>{let{id:a,slug:r,title:i}=e;return t!==n.length-1?l.createElement(l.Fragment,{key:a},l.createElement(g,{to:r},i),l.createElement(E,{size:"0.6rem",svg:"chevronRight",role:"presentation","aria-hidden":"false"})):l.createElement(h,{key:a},i)})))}},6169:function(e,t,n){n.d(t,{R:function(){return u}});var l=n(4041),a=n(3057),r=n(7286),i=n(6341),c=n(4702),o=n(4393),s=n(8893),m=n(405);const d=(0,a.default)(r.l).withConfig({displayName:"PageEditThisPage__PageEditThisPageWrapper",componentId:"sc-15acsrz-0"})(["display:inline-flex;align-items:center;text-decoration:none;font-size:",";padding-top:",";padding-bottom:",";margin-top:",";color:",";"],c.$.COMPLEMENTARY,o.F.ONE,o.F.ONE,o.F.EIGHT,i.lm.TEXT_LOW_CONTRAST),u=e=>{const{pageUrl:t}=e,n=s.t.GITHUB_DOCUMENTATION+"/"+t;return l.createElement(d,{to:n},l.createElement(m.vK,{iconSvg:"pen",iconSize:"1.5rem"},"Edit this page on GitHub"))}},8324:function(e,t,n){n.d(t,{o:function(){return v}});var l=n(4041),a=n(3057),r=n(7286),i=n(4906),c=n(6341),o=n(4393),s=n(4702),m=n(405),d=n(4094);const u=o.F.FOUR,p=a.default.nav.withConfig({displayName:"PagePagination__PagePaginationWrapper",componentId:"sc-3ejrow-0"})(["",";display:flex;justify-content:space-between;margin-top:",";"],(0,d.F)(u,"","div"),o.F.EIGHT),g=a.default.div.withConfig({displayName:"PagePagination__Item",componentId:"sc-3ejrow-1"})(["> a{color:",";}&:nth-child(2) > a{text-align:right;color:",";}"],c.lm.BRAND_PRIMARY,c.lm.BRAND_SECONDARY),h=a.default.div.withConfig({displayName:"PagePagination__ItemLabel",componentId:"sc-3ejrow-2"})(["color:",";padding-bottom:",";"],c.lm.TEXT_LOW_CONTRAST,o.F.ONE),E=a.default.div.withConfig({displayName:"PagePagination__ItemTitle",componentId:"sc-3ejrow-3"})(["display:inline-flex;align-items:center;font-weight:",";","{",";}"],s.s.MEDIUM,m.eU,i.y),v=e=>{const{next:t,previous:n}=e;return l.createElement(p,{"aria-label":"Pagination Navigation"},l.createElement(g,null,n&&l.createElement(r.l,{to:n.slug},l.createElement(h,null,"Previous"),l.createElement(E,null,l.createElement(m.vK,{iconSvg:"arrowLeft"},n.title)))),l.createElement(g,null,t&&l.createElement(r.l,{to:t.slug},l.createElement(h,null,"Next"),l.createElement(E,null,l.createElement(m.vK,{iconSvg:"arrowRight",iconSide:"right"},t.title)))))}},352:function(e,t,n){n.d(t,{G:function(){return c}});var l=n(4041),a=n(408),r=n(3594),i=n(7564);const c=e=>{const{title:t,description:n,lang:c="en",url:o,children:s}=e,m=(0,a.Q)(),d=t+" | "+(0,i.fq)(m.title),u=n||m.description;return l.createElement(l.Fragment,null,l.createElement("html",{lang:c}),l.createElement("title",null,d),l.createElement("link",{rel:"canonical",href:o}),l.createElement("meta",{name:"description",content:u}),l.createElement("meta",{name:"og:title",content:t}),l.createElement("meta",{name:"og:description",content:u}),l.createElement("meta",{name:"og:type",content:"article"}),l.createElement("meta",{name:"og:locale",content:"en_EN"}),l.createElement("meta",{name:"og:url",content:o}),l.createElement("meta",{name:"og:site_name",content:(0,r.b)(m.siteUrl)}),l.createElement("meta",{name:"twitter:card",content:"summary"}),l.createElement("meta",{name:"twitter:creator",content:m.author}),l.createElement("meta",{name:"twitter:title",content:t}),l.createElement("meta",{name:"twitter:description",content:u}),s)}},3594:function(e,t,n){n.d(t,{b:function(){return l}});const l=e=>e.replace(/(^\w+:|^)\/\//,"")},824:function(e,t,n){t.A=n.p+"static/maskable-36b9e327abc26d5d02e9350d184a058f.png"}}]);
//# sourceMappingURL=component---src-templates-default-tsx-content-file-path-src-content-pages-get-started-svelte-mdx-9c1a5c8e6a7d2db78893.js.map