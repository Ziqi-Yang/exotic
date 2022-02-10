# 废弃

# github python 默认 python3.8 (2022/2/10)
import nbformat
from nbconvert import MarkdownExporter
import time
import sys
import os

exporter = MarkdownExporter()

# 注意把notebook文件统一放在post目录下的`notebook`文件夹内
# 本程序放在项目根目录下运行
rootDir = sys.path[0]
postDir = os.path.join(rootDir,"content/post")
notebookDir = os.path.join(postDir,"notebook")

# NOTE 注意注释掉下行
# notebookDir = os.path.join(rootDir,"notebook")

notebookFiles = os.listdir(notebookDir)
notebookFiles = [file for file in notebookFiles if file.endswith(".ipynb")]

def convertMd(filePath:str):
    # notebook转化为markdown文件,保存在postDir中
    tmpFileName = os.path.basename(filePath)[:-6] # 去除 .ipynb
    expFileName = tmpFileName.split("#")[0] + ".md" # 去除标签
    exportPath = os.path.join(postDir,expFileName)

    with open(filePath) as f:
        nb = nbformat.reads(f.read(),nbformat.NO_CONVERT)

    exporter = MarkdownExporter()
    source, _ = exporter.from_notebook_node(nb)

    with open(exportPath, 'w+') as out_file:
        out_file.writelines(source)

    return exportPath


def getTags(filename:str):
    # 从文件名中获取tag
    splits = filename.split(".")
    mainSpace = splits[-2] # tags 出现的位置
    splits = mainSpace.split("#")
    return splits[1:]
    
def genTagStr(tags:list):
    # 根据所得到的tags生成tags字符串
    template = "tags:\n"
    for tag in tags:
        template += f"  - {tag}\n"
    return template

def genTime():
    # like:  2022-02-04T10:23:14+08:00
    TIME = time.strftime("%Y-%m-%dT%H:%M:%S%z", time.localtime())
    TIME = TIME[:-2] + ":" + TIME[-2:]
    return TIME

def genInfo(title:str,dateStr:str, tagStr:str): 
    INFO ="""---
title: {title}
date: {date}
hiddenFromHomePage: false
{tags}
draft: false
---

> This blog is converted from a jupyter notebook file, and the creation time is set to the same as the latest blog.

""".format(title=title,date=dateStr,tags=tagStr)
    return INFO

def addInfo(filePath:str,info:str):
    with open(filePath, "r+") as f:
        old = f.read()
        f.seek(0)
        f.write(info)
        f.write(old)


for file in notebookFiles:
    tagStr = genTagStr(getTags(file))
    dateStr = genTime()
    mdPath = convertMd(os.path.join(notebookDir,file))
    mdName = os.path.basename(mdPath)[:-3] # 去除 .md
    info = genInfo(mdName,dateStr,tagStr)# 以没有标签和后缀的文件名为标题
    addInfo(mdPath,info)
    print("Convert all notebook files to hugo markdown type done!")




