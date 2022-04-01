<script>
import Sidemenu from './components/Sidemenu.vue';
import VueHorizontal from "vue-horizontal";
import Project from "./components/Project.vue";
import Skill from "./components/Skill.vue";

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
    Skill
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
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          link: "https://mamiglia.github.io/meravigliosi-automi",
          gitLink: "https://github.com/Mamiglia/meravigliosi-automi"
        },
        {
          title: "this.",
          image: "",
          text: "This same site is one of my projects. Built in Vue js.",
          gitLink: "https://github.com/Mamiglia/mamiglia.github.io"
        }
      ],
      skills: shuffleArray([
        {
          title: "JavaScript",
          img: "../../data/images/js.svg"
        },
        {
          title: "Java",
          img: "../../data/images/java.svg"
        },
        {
          title: "C",
          img: "../../data/images/c.svg"
        },
        {
          title: "Java Spring",
          img: "../../data/images/javaspring.svg"
        },
        {
          title: "Kotlin",
          img: "../../data/images/kotlin.svg"
        },
        {
          title: "PostgreSQL",
          img: "../../data/images/postgres.svg"
        },
        {
          title: "CSS",
          img: "../../data/images/css.svg"
        },
        {
          title: "HTML",
          img: "../../data/images/html.svg"
        },
        {
          title: "Vue.js",
          img: "../../data/images/vue.svg"
        },
        {
          title: "Python",
          img: "../../data/images/python.svg"
        },
        {
          title: "Bash",
          img: "../../data/images/bash.svg"
        },
        {
          title: "prolog",
          img: "../../data/images/prolog.svg"
        }
        
      ])
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
}

.horizontal {
  width: 90%;
  padding-top: 10%;
  height: fit-content ;
  max-height: 100vw;
}

#projects {
  grid-area: a;
}

#knowledge {
  grid-area: b;

}

#contacts {
  grid-area: c;
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
}
.root {
  margin: 0;
  width: 99vw;
  /* overflow-x: hidden; */
}
</style>
