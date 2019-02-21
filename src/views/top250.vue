<template>
    <div class="ztree">
        <el-row>
            <el-col :span="12">
                <el-button icon="el-icon-plus" size="mini" type="text" @click="add">新增节点</el-button>
            </el-col>
            <el-col :span="12">
                <el-button icon="el-icon-delete" type="text" size="mini" @click="remove">删除节点</el-button>
            </el-col>
        </el-row>
        <ul id="treeDemo" class="ztree"></ul>
    </div>
</template>
<script>
import '../../plugins/jquery-1.4.4.min'
import '../../plugins/jquery.ztree.core.min'
import '../../plugins/jquery.ztree.excheck.min'
import '../../plugins/jquery.ztree.exedit.min'
export default {
    name:'top250',
    props: {
 
        zNodes: {
 
            type: Array
 
        },
 
        selectedNodeId: ""
 
    },
 
    data() {
 
        return {
 
            selectedNode: {},
 
            setting: {
 
                view: {
 
                    showIcon: false
 
                },
 
                edit: {
 
                    enable: true,
 
                    showRemoveBtn: false,
 
                    showRenameBtn: false
 
                },
 
                data: {
 
                    keep: {
 
                        parent: true,
 
                        leaf: true
 
                    },
 
                    simpleData: {
 
                        enable: true
 
                    }
 
                },
 
                callback: {
 
                    onClick: this.zTreeOnClick,
 
                    onRename: this.zTreeOnRename
 
                }
 
            }
 
        };
 
    },
 
    methods: {
 
        // 初始化ztree
 
        init() {
 
            $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
 
        },
 
 
 
        // 树节点点击事件
 
        zTreeOnClick: function(event, treeId, treeNode) {
 
            this.selectedNode = treeNode;
 
            this.$emit("treeClick", treeNode);
 
        },
 
 
 
        // 树节点编辑名称回调
 
        zTreeOnRename(event, treeId, treeNode, isCancel) {
 
            this.$emit("addNode", treeNode);
 
        },
 
 
 
        // 点击添加按钮事件
 
        add() {
 
            let newCount = 1;
 
            let zTree = $.fn.zTree.getZTreeObj("treeDemo"),
 
            nodes = zTree.getSelectedNodes(),
 
            treeNode = nodes[0];
 
            if (treeNode) {
 
                if (treeNode.level === 2) {
 
                    this.$message("分类不能超过三级");
 
                    return;
 
                } else {
 
                    treeNode = zTree.addNodes(treeNode, {
 
                        id: 100 + newCount,
 
                        isParent: true,
 
                        pId: treeNode.id,
 
                        name: "new node" + newCount++
 
                    });
 
                }
 
            } else {
 
                treeNode = zTree.addNodes(null, {
 
                    id: 100 + newCount,
 
                    isParent: true,
 
                    pId: 0,
 
                    name: "new node" + newCount++
 
                });
 
             }
 
            zTree.editName(treeNode[0]);
 
        },
 
 
 
        // 点击删除按钮事件
 
        remove() {
 
            let zTree = $.fn.zTree.getZTreeObj("treeDemo"),
 
            nodes = zTree.getSelectedNodes(),
 
            treeNode = nodes[0];
 
            if (nodes.length == 0) {
 
                this.$message("请先选择一个节点");
 
                return;
 
            } else {
 
                this.$confirm("此操作将永久删除该节点, 是否继续?", "提示", {
 
                    confirmButtonText: "确定",
 
                    cancelButtonText: "取消",
 
                    type: "warning"
 
                })
 
                .then(() => {
 
                    this.$emit("removeNode", treeNode);
 
                })
 
                .catch(() => {});
 
            }
 
        }
 
    },
 
    watch: {
 
        // 监听树节点的变化更新树
 
        zNodes: function(val) {
 
            this.init();
 
        },
 
    },
 
    mounted() {
 
        this.init();
 
    }
 
}
</script>
