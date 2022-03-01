<template>
  <div class="content student-class">
    <UtilsStepBar :steps="4" :current="1" />
    <!-- [ TEXTO, VIDEO, ARQUIVO, AUDIO, EMBEDDED, ATIVIDADE ] -->
    <div v-for="l in lesson.contents" v-bind:key="l.type">
      <div v-if="l.type == 'TEXTO'">
          {{l.description}}
      </div>
      <div v-if="l.type == 'VIDEO'">
        <div class="player-class">
          <div class="player-class-media">
            <iframe width="100%" height="100%"
              :src="l.description"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <div class="player-class-controls">
            <div>
              <div class="player-class-control">
                <img width="25" :src="require('../../../assets/img/utils/ico-expand-gray.svg')" alt="">
                <span>Modo teatro</span>
              </div>
              <div class="player-class-control">
                <img width="25" :src="require('../../../assets/img/utils/ico-lamp-gray.svg')" alt="">
                <span>Modo foco</span>
              </div>
            </div>
        </div>
        </div>
      </div>
      <div v-if="l.type == 'ARQUIVO'">
      </div>
      <div v-if="l.type == 'AUDIO'">
      </div>
      <div v-if="l.type == 'EMBEDDED'">
      </div>
      <div v-if="l.type == 'ATIVIDADE'">
      </div>
    </div>
    
    <div class="content-class">
      <h5>{{lesson.title}}</h5>
      <div class="files-content-class">
        <span>Arquivos para baixar:</span>
        <div class="files">
          <FileItem />
        </div>
      </div>
    </div>
    
    <hr/>

    <div class="comments-class">
      <span>Comentários dessa aula</span>
      <div class="comments">
          <div class="shadow-comments">
            <b-button class="btn-purple pl-4 pr-4" v-b-tooltip="'Ver fórum'">
              Fórum em breve
            </b-button>
          </div>
          <Comment v-for="n in 5" :key="n" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: "Aluno - Masters",
    }
  },

  data() {
    return {
      lesson: {}
    }
  },

  methods: {
    async getClass() {

      let classes = []
      // pegar todos os módulos
      //.....
      // pegar todos as aulas daqueles módulos
      await this.$axios.$get(`class/all?moduleId=${'c2e78163-edb1-4496-bb71-7727e7c3456d'}`).then(
        response => {
          response.data.forEach(r => {
            classes.push(r)
          })
        }
      ).catch(e => {
        console.log(e)
      }).finally(() => {})

      await classes.forEach(async element => {
        await this.$axios.$get(`class?id=${element.id}`).then(response => {
          this.lesson = response.data;
          console.log(">>>>>> ", JSON.stringify(this.lesson))
        }).catch(e => {
          console.log(e)
        }).finally(() => {})
      });
      
    },
  },

  mounted() {
    this.getClass();
  }
}
</script>

<style scoped>
.student-class {
  margin: 0 132px;
}

/* content student-class */
.player-class {
  display: flex;
  width: 100%;
  flex: 500px;
  flex-wrap: wrap;
}

.player-class-media {
  width: 80%;
  height: 415px;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center;
  background-size: cover;
  border: 1px solid #89238A;
  box-sizing: border-box;
  border-radius: 4px;
}

.player-class-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
}

.player-class-control {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 25px 0;
}

.player-class-controls img {
  margin: 0 10px 0 0;
}

.player-class-controls span {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #5C5C64;
  margin-top: 3px;
}

/* content-class */
.content-class {
  margin-top: 32px;
}

h5 {
  font-family: 'Poppins Regular';
  color: #89238A;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 125%;
  margin-bottom: 16px;
}

p {
  font-size: 14px;
  line-height: 20px;
  color: #373740;
}

.files-content-class {
  margin-top: 32px;
}

.comments-class > span,
.files-content-class > span {
  font-family: "Inter Semibold";
  font-size: 14px;
  line-height: 20px;
  color: #373740;
  display: block;
  margin-bottom: 21px;
}

.files-content-class .files {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
}

.comments-class .comments {
  position: relative;
}

/* shadow-comments */
.shadow-comments {
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  min-height: 100%;
  width: 100%;
}
</style>
