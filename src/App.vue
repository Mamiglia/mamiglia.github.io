<script>
import Sidemenu from './components/Sidemenu.vue';
import VueHorizontal from "vue-horizontal";
import Project from "./components/Project.vue";
import Skill from "./components/Skill.vue";
import Contact from './components/Contact.vue';


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

export default {
  name:"App",
  components: {
    Sidemenu,
    VueHorizontal,
    Project,
    Skill,
    Contact
},
  data() {
    return {
      projects : [
        {
          title: "Reddit-Wallpaper",
          image: "",
          text: "Bored by your old static wallpaper? Want to see something new? Well my boy this is the right place for you. This magnificent tool automatically downloads and sets up a wallpaper from the website reddit! It allows you to decide the period of time after you get bored by a wallpaper and changes it, and you won't need to move a single muscle. Best thing of all, it applies wallpapers using a non-repetitive pattern - meaning that it's unlikely that you will ever see the same wallpaper twice. And it has so many more settings to customize!",
          link: "https://github.com/Mamiglia/Reddit-Wallpaper/releases/latest",
          gitLink: "https://github.com/Mamiglia/Reddit-Wallpaper"
        },
        {
          title: "Meravigliosi Automi",
          image: "",
          text: "This website makes it easy to create and edit Finite States Automaton, allowing one to develop a deeper understanding of the theory behind FSA and Acceptors.The website is built to be easy to use, even for beginners, targeting mainly Computer Science students. The technologies used are mainly Vue.js and responsive CSS, following most modern web-dev practices.",
          link: "https://mamiglia.github.io/meravigliosi-automi",
          gitLink: "https://github.com/Mamiglia/meravigliosi-automi"
        },
        {
          title: "this.",
          image: "",
          text: "This same site is one of my projects. Built in Vue.js and reactive CSS. The website has modern design and high responsiveness, includes dark and light modes!",
          gitLink: "https://github.com/Mamiglia/mamiglia.github.io"
        }
      ],
      skills: shuffleArray([
        {
          title: "JavaScript",
          img: "src/assets/images/js.svg"
        },
        {
          title: "Java",
          img: "src/assets/images/java.svg"
        },
        {
          title: "C",
          img: "src/assets/images/c.svg"
        },
        {
          title: "Java Spring",
          img: "src/assets/images/javaspring.svg"
        },
        {
          title: "Kotlin",
          img: "src/assets/images/kotlin.svg"
        },
        {
          title: "PostgreSQL",
          img: "src/assets/images/postgres.svg"
        },
        {
          title: "CSS",
          img: "src/assets/images/css.svg"
        },
        {
          title: "HTML",
          img: "src/assets/images/html.svg"
        },
        {
          title: "Vue.js",
          img: "src/assets/images/vue.svg"
        },
        {
          title: "Python",
          img: "src/assets/images/python.svg"
        },
        {
          title: "Bash",
          img: "src/assets/images/bash.svg"
        },
        {
          title: "prolog",
          img: "src/assets/images/prolog.svg"
        }
        
      ]),
      contacts: [
        {
          name: "Telegram",
          icon: "fa fa-telegram",
          link: "https://t.me/mamiglia"
        },
        {
          name:"Github",
          icon: "fa fa-github",
          link: "https://github.com/Mamiglia"
        },
        {
          name: "Reddit",
          icon: "fa fa-reddit",
          link: "https://www.reddit.com/user/mamiglia"
        }
      ]
    }
  }
  
};


</script>

<template>
  <div class="root">
    <Sidemenu id="sidemenu"/>
    <div class="main">
      <vue-horizontal reactive id="projects" class="horizontal" snap="center">
        <Project v-for="p in projects" :key="p.title" 
          :title="p.title" 
          :image="p.image" 
          :text="p.text" 
          :link="p.link" 
          :gitLink="p.gitLink"/>
      </vue-horizontal>
      <vue-horizontal reactive id="knowledge" class="horizontal">
          <Skill v-for="s in skills" 
            :title="s.title"
            :img="s.img"
            />
      </vue-horizontal>
      <div id="contacts">
        <Contact v-for="c in contacts"
          :name="c.name"
          :icon="c.icon"
          :link="c.link"/>
      </div>
    </div>
  </div>
   
</template>

<style>
@import './assets/base.css';
#sidemenu {
  height: 100vh;
  width: 30vw;
  position: fixed;
  z-index: 1;
}

.horizontal {
  width: 90%;
  padding-top: 10%;
  margin-left: 5%;
  height: fit-content ;
  max-height: 100vw;

}

#projects {
  grid-area: a;
  scroll-snap-align: start;
}

#knowledge {
  padding-top: auto;
  padding-bottom: auto;
  grid-area: b;
  height: fit-content;
  /* justify-self: center; */
  /* align-self: center; */
  scroll-snap-align: start;
}

#contacts {
  grid-area: c;
  display: flex;
  align-items: center;

  justify-content: center;
  width: 100%;
  scroll-snap-align: start;
}
.main {
  display: grid;
  grid-template-areas: 
    "a"
    "b"
    "c";
  grid-template-columns: 100%;
  grid-template-rows: 100vh  100vh 100vh;
  margin-left: 33vw;
  max-width: 67vw;
  overflow-x: hidden;

  height: 100vh;
  
  scroll-behavior: smooth;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-snap-points-y: repeat(100vh);
}
.root {
  margin: 0;
  width: 100vw;

  height: 100vh;
  overflow-x: hidden;
}

@media screen and (orientation:portrait) {
  .main {
    margin-left: 0;
    margin-top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3em;
    width: 100vw;
    max-width: 100vw;
    scroll-snap-type: none;
  }

  #sidemenu {
    width: 100vw;

  }

  .main>* {
    margin-left: 0;
    max-width: 100vw;
    max-height: 100%;
  }


}
</style>
