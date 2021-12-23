# 开始
echo "\033[1;32m============================== start push ==============================\033[0m"

# 提交描述
msg=$1
if [ ! $msg ]
then
  msg=$(date "+%Y-%m-%d %H:%M:%S")" 提交优化"
fi

# 当前分支
cb=$(git branch | sed -n '/\* /s///p')

# Git
git add .
git commit -m "$msg"
# 拉取冲突
cpmsg=$(git pull origin $cb)
if [[ $cpmsg =~ "冲突" || $cpmsg =~ "CONFLICT" ]]
then
  echo "\033[1;31m============================== 合并冲突 pull $cb ==============================\033[0m"
fi
echo "$cpmsg"
git push origin $cb

# 结束
echo "\033[1;32m============================== end push ==============================\033[0m"