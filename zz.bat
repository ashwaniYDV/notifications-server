@echo off

echo "Welcome to auto push"
set /p branch="Enter branch: "
set /p commit="Enter commit msg without spaces: "

git add .
git commit -m %commit%
git push origin %branch%