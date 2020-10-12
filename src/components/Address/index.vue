<template>
  <el-cascader
    ref="tree"
    v-model="code"
    :options="provenceArray"
    clearable
    :disabled="disabled"
    :props="props"
    :style="{width: width}"
    :show-all-levels="false"
    @change="handleItemChange"
  />
</template>

<script>
import {
  getAddress
} from '@/api'
// import { OpenLoading } from '@/utils/loading'

export default {
  name: 'Address',
  props: ['formCode', 'width', 'idEdit', 'scope', 'disabled', 'other'],
  data() {
    return {
      // 所属区域数据结构
      props: {
        label: 'areaName',
        value: 'areaCode',
        children: 'children',
        checkStrictly: true,
        leaf: 'hasChildren',
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.value) {
            if (!node.data.hasChildren) {
              getAddress({
                areaCode: node.value
              }).then(res => {
                if (res) {
                  this.currentData = res
                  setTimeout(() => {
                    const arr = document.querySelectorAll('.el-cascader-menu')
                    if (arr[arr.length - 1].contains(document.querySelector('.el-cascader-menu__empty-text')) === false) {
                      arr[arr.length - 1].style.display = 'block'
                    }
                  })
                }
                resolve(res)
              })
            } else {
              resolve()
            }
          }
        }
      },
      code: [],
      // 查询--所属区域数组
      provenceArray: [],
      // 区域当前等级
      levelCurrent: [],
      // 停止调区域接口
      isUseAddressApi: true,
      currentData: [],
      myScope: '',
      _noLazyLoadLevel_: 99,
      listDeepLength: 0
    }
  },
  watch: {
    // 编辑页面时第一次赋值
    idEdit: {
      handler() {
        this.code = this.formCode
        this.getAddress()
      }
    }
  },
  mounted() {
    this.myScope = this.scope
    if (!this.idEdit) {
      this.getAddress()
    }
  },
  methods: {
    // 编辑状态下同步获取数据
    async getAddress() {
      await this.getProvence(0)
      await this.listDeepLengthFun(this.provenceArray)
      if (this.code.length !== 0) {
        this.code = this.code.splice(',').filter((item, index) => {
          return index >= this.listDeepLength
        })
        for (let i = 0; i < this.code.length; i++) {
          await this.getProvence(this.code[i])
        }
      }
    },
    listDeepLengthFun(obj) {
      if (this.provenceArray && this.provenceArray.length) {
        this.listDeepLength = this.provenceArray[0].level - 1
      }
    },
    // 获取区域子数据
    getChildren(parentArray, children, val) {
      // 判断是否有子集， 改变该子集下children状态，页面ui该层会变成可以被展开状态
      children.forEach((item, index) => {
        if (item.hasChildren) {
          children[index].children = []
        } else {
          children[index].children = null
        }
      })
      for (let i = 0; i < parentArray.length; i++) {
        if (parentArray[i].areaCode === val) {
          // 找到该层对应对象，把子集赋值过去，然后终止循环
          parentArray[i].children = children
          break
        } else {
          if (parentArray[i].children !== null) {
            // 该层该对象不是对应对象，往该对象下层递归寻找匹配
            this.getChildren(parentArray[i].children, children, val)
          }
        }
      }
    },
    // 判断是否是所属区域最后一级
    isLastLevel(arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].areaCode === val && arr[i].hasChildren === 'false') {
          // 表示树的最后一级
          this.isUseAddressApi = false
          break
        } else {
          // 不是树的最后一级 递归往下一级找
          if (arr[i].hasChildren === 'true') {
            this.isLastLevel(arr[i].children, val)
          }
        }
      }
    },
    // 获取所属区域接口
    getProvence(val) {
      // 需要被await， 要返回一个promise对象
      return new Promise((resolve, reject) => {
        this.$emit('getAreaCode', this.code) // 把选中的值传给父组件
        this.isUseAddressApi = true // 初始化可以调用getAddress接口状态
        this.isLastLevel(this.provenceArray, val) // 判断是否是可以调用getAddress接口，是否需要改变this.isUseAddressApi状态
        if (!this.isUseAddressApi) {
          // 如果this.isUseAddressApi === false，表示不能调用getAddress接口，终止该方法
          return false
        }
        // 调用每一级树的接口
        getAddress({
          areaCode: val,
          scope: this.myScope
        }).then(res => {
          if (res) {
            if (val === 0) {
              // 第一级树初始化
              this.provenceArray = res
              this.provenceArray.forEach((item, index) => {
                if (item.hasChildren) {
                  // 有子集，改变item的children状态，null变为空数组，页面ui会变成可以被展开状态
                  this.provenceArray[index].children = []
                }
                if (this.code.indexOf(item.areaCode) !== -1) {
                  this.provenceArray[index].loading = true
                }
              })
            } else {
              const children = res
              children.forEach((item, index) => {
                if (this.code.indexOf(item.areaCode) !== -1) {
                  children[index].loading = true
                }
              })
              // 递归获取树子集的方法
              this.getChildren(this.provenceArray, children, val)
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // 获取所属区域子数据
    handleItemChange(val) {
      this.$emit('getAreaCode', this.code)
      this.$emit('getAreaLevel', this.$refs.tree.getCheckedNodes()[0].data.level)
      this.getChildren(this.provenceArray, this.currentData, val)
      if (this.other) {
        this.other()
      }
      // this.$refs.tree.dropDownVisible = false
      this.$nextTick(() => {
        const arr = document.querySelectorAll('.el-cascader-menu')
        if (arr[arr.length - 1].contains(document.querySelector('.el-cascader-menu__empty-text')) === true) {
          arr[arr.length - 1].style.display = 'none'
        }
      })
      // this.getProvence(val[val.length - 1])
    }
  }
}
</script>

<style scoped>

</style>

