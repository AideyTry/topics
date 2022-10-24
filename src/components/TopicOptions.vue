<template>
  <el-form :model="optionsData" :rules="optionsRules" ref="optionsRef">
    <el-row
      :gutter="6"
      style="margin-bottom: 6px"
      v-for="(item, index) in optionsData.options"
      :key="item.id"
      class="options"
    >
      <el-col :span="4">
        <el-form-item>
          <el-tag type="info" class="score-info">分值</el-tag>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item prop="score">
          <el-input v-model="optionsData.options[index].score" placeholder="请输入分值" @input="onInput">
            <template #append>分</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="value">
          <el-input
            v-model="optionsData.options[index].value"
            placeholder="请输入选项内容"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item>
          <el-button @click="onDelete(index)" type="danger">删除</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue'
const props = defineProps(['options'])
const emits = defineEmits(['onDelete'])

const optionsRef = ref(null)

const optionsData = reactive({
    options: props.options
})

const checkScore = (rule, value, callback) => {
  if (!Number(value)) {
    callback()
    } else {
    callback(new Error('分数只能为数值'))
    }
}

const optionsRules = reactive({
  score: [
    {
      validator: checkScore,
      trigger: 'blur',
    },
  ],
  value: [
    {
      message: '请输入内容',
      trigger: 'blur',
    },
  ],
})

const onInput = (value) => {
    optionsRef.value.validateField((valid) => {
        console.log('valid, fields===', valid)
    })
}

const onDelete = (index) => {
  emits('onDelete', index)
}
</script>
<script>
export default {
  name: 'TopicOptions',
}
</script>

<style lang="scss" scoped>
.options {
  margin: 16px 0;
  &:first-child {
    margin-top: 0;
  }
}
.score-info {
  width: 100%;
  height: 32px;
}
</style>
