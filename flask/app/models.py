from . import db
from datetime import datetime


# 会员数据模型
class Member(db.Model):
    __tablename__ = 'member'
    id = db.Column(db.Integer, primary_key=True)  # 编号
    openid = db.Column(db.String(80))  # 微信用户id
    nickname = db.Column(db.String(100))  # 用户名
    avatar = db.Column(db.String(255))  # 头像
    sesion = db.Column(db.Integer)  # 通过关卡
    addtime = db.Column(db.DateTime, index=True, default=datetime.now)  # 注册时间

    def __repr__(self):
        return '<User %r>' % self.nickname


# 考题数据模型
class Exam(db.Model):
    __tablename__ = 'exam'
    id = db.Column(db.Integer, primary_key=True)  # 编号
    pictureUrl = db.Column(db.String(255))  # 图片url
    answer = db.Column(db.String(20))  # 答案
    candidates = db.Column(db.String(100))   # 被选项
    addtime = db.Column(db.DateTime, index=True, default=datetime.now)  # 添加时间

    def __repr__(self):
        return '<Exam %r>' % self.answer




