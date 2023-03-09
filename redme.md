git init 初始化
git add . 添加暂存区
git status 查看状态
git commit 提交仓库
git check -- 文件名 撤销操作
git reset HEAD 文件名  移除暂存
git commit -a -m ''   跳过暂存区直接提交
git rm -f 文件名   删除仓库中的文件且删除文件夹中的
git rm --cached 文件名    删除仓库中的文件不删除文件夹中的

1 # 在一行上展示所有的提交历史2 
git log --pretty=oneline
3
4#使用git reset --hard命令，根据指定的提交ID回退到指定版本5 git reset --hard <CommitID>
6
7#在旧版本中使用git reflog --pretty=oneline命令，查看命令操作的历史
8 git reflog --pretty=oneline
10 #再次根据最新的提交ID，跳转到最新的版本11 git reset --hard <CommitID>


git branch 查看分支

git branch <名称>  创建分支

git checkou 分支名   切换分支
