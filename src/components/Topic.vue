<template>
  <div class="topic-wraper">
    <div class="topic">
      <el-form>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="题目类型">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="题目描述">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="primary"
              @click="onOpen"
              :disabled="topicItemVisible"
              >创建题目</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <div class="add-topic" v-if="topicItemVisible">
        <el-form
          ref="topicFormRef"
          :model="topicForm"
          :rules="topicRules"
          @validate="onValidateField"
        >
          <el-form-item label="题目ID号">
            <el-input v-model="topicForm.topicId" disabled></el-input>
          </el-form-item>
          <el-form-item label="题目类型" prop="topicType">
            <el-input v-model="topicForm.topicType"></el-input>
          </el-form-item>
          <el-form-item label="题目描述" prop="topicDes">
            <el-input
              type="textarea"
              :rows="3"
              v-model="topicForm.topicDes"
            ></el-input>
          </el-form-item>
          <el-form-item label="&nbsp;选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项&nbsp;">
            <TopicOptions
              style="margin-bottom: 10px"
              ref="topicOptionsRef"
              :options="topicForm.options"
              :key="topicForm.topicId"
              :topicRules="topicRules"
              @onDelete="onDelete"
            />
            <el-button @click="addOption" style="width: 100%" type="success"
              >添加选项</el-button
            >
          </el-form-item>
          <el-form-item class="add-topic-btn" center>
            <el-button type="primary" @click="onCreate(topicFormRef)"
              >保存</el-button
            >
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="topic-content">
        <div v-for="(item, index) in topicList" :key="item.topicId">
          <div class="topic-type">
            <span>{{ index + 1 }}、</span>{{ item.topicType }}
          </div>
          <div class="topic-des">{{ item.topicDes }}</div>
          <div class="options">
            <el-radio-group v-model="item.checkedValue">
              <el-radio
                :label="element.score"
                v-for="element in item.options"
                :key="element.id"
                >{{ element.value }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import TopicOptions from './TopicOptions.vue'
import { deepClone } from '../utils/util'
const topicItemVisible = ref(false)
const topicList = reactive([])
const options = reactive([
  {
    id: 1,
    score: '',
    value: '',
  },
])

const topicFormRef = ref(null)
const topicOptionsRef = ref(null)

const topicForm = reactive({
  topicId: null,
  topicType: '',
  topicDes: '',
  options: [
    {
      id: 1,
      score: '',
      value: '',
    },
  ],
})

const topicRules = reactive({
  topicType: [
    {
      required: true,
      message: '请输入题目类型',
      trigger: 'blur',
    },
  ],
  topicDes: [
    {
      required: true,
      message: '请输入题目描述',
      trigger: 'blur',
    },
  ],
})

const onOpen = () => {
  topicItemVisible.value = true
  topicForm.topicId = uuidv4().replace(/-/g, '')
}

/**
 * @description: 确认创建增加选项
 * @param {*} formEl
 * @Author:
 * @return {*}
 */
const onCreate = async (formEl) => {
  if (!formEl) return
  const valid = await formEl.validate()
  if (valid) {
    topicItemVisible.value = false
    const topic = deepClone(topicForm)
    topic.checkedValue = ''
    topicForm.topicId = null
    topicForm.topicType = ''
    topicForm.topicDes = ''
    topicForm.options = [
      {
        id: 1,
        score: '',
        value: '',
      },
    ]
    topicList.push(topic)
    formEl.resetFields()
  }
}

const onCancel = () => {
  topicForm.topicId = null
  topicForm.topicType = ''
  topicForm.topicDes = ''
  topicForm.options = [
    {
      id: 1,
      score: '',
      value: '',
    },
  ]
  topicItemVisible.value = false
}

/**
 * @description: 选项操作，添加
 * @Author:
 * @return {*}
 */
const addOption = () => {
  const id =
    topicForm.options.length > 0
      ? topicForm.options[options.length - 1].id + 1
      : 1
  const item = {
    id,
    score: '',
    value: '',
  }
  topicForm.options.push(item)
}

const onDelete = (index) => {
  topicForm.options.splice(index, 1)
}
</script>
<script>
export default {
  name: 'TopicIndex',
}
</script>

<style lang="scss" scoped>
.topic-wraper {
  position: relative;
  .topic-content {
    margin-top: 30px;
  }
  .add-topic {
    position: absolute;
    z-index: 1000;
    left: 10px;
    top: 40px;
    width: 100%;
    background-color: #fff;
    .add-topic-btn {
      ::v-deep .el-form-item__content {
        display: flex;
        justify-content: center;
      }
    }
  }
  .option-item {
    // display: flex;
    // align-items: center;
    // margin-bottom: 6px;
  }
  .topic-content {
    ::v-deep .el-radio-group {
      flex-direction: column;
      align-items: flex-start;
      text-indent: 10px;
    }
    .topic-type,
    .topic-des,
    .options {
      text-align: left;
      text-indent: 2em;
    }
    .topic-des {
      text-indent: 3.5em;
    }
    .options {
      text-indent: 5em;
    }
  }
}
</style>
