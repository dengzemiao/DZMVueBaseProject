# 开始
echo "\033[1;42m============================== 开始提交 ==============================\033[0m"

# 当前分支
cb=$(git branch | sed -n '/\* /s///p')
# 错误码
code=1
# 是否开启log (1：开启，0：不开启)
isLog=1
# 描述
msg="$1"
if [[ -z $msg ]];then
  msg="$(date '+%Y-%m-%d %H:%M:%S') 提交优化"
fi
# 分支列表
bs=$(git branch -a)
# 移除偏移分支(不需要可删除)
fs=$(ls)
# 是否存在移除偏移脚本
if [[ "$fs" =~ "gitdeloffset.sh" ]];then
  sh gitdeloffset.sh "$cb"
fi
# Git
if [ $isLog -eq 1 ];then
  echo "\033[1;32m------------------------------ git add . \033[0m"
fi
git add .
if [ $isLog -eq 1 ];then
  echo "\033[1;32m------------------------------ git commit -m "$msg" \033[0m"
fi
git commit -m "$msg"
# 拉取当前分支
if [[ "$bs" =~ "origin/$cb" ]];then
  if [ $isLog -eq 1 ];then
    echo "\033[1;32m------------------------------ git pull origin "$cb" \033[0m"
  fi
  git pull origin "$cb"
  if [ $? -ne 0 ];then
    echo "\033[1;41m============================== 拉取远程分支 $cb 错误 \033[0m"
    exit $code
  fi
fi
# 提交当前分支
if [ $isLog -eq 1 ];then
  echo "\033[1;32m------------------------------ git push origin "$cb" \033[0m"
fi
git push origin "$cb"
if [ $? -ne 0 ];then
  echo "\033[1;41m============================== 提交远程分支 $cb 错误 \033[0m"
  exit $code
fi

# 结束
echo "\033[1;42m============================== 提交成功 ==============================\033[0m"