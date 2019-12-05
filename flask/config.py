class Config:
    SECRET_KEY = 'mrsoft'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    # 小程序配置信息
    AppID = '************'  # 小程序的AppID
    AppSecret = '************'  # 小程序的AppSecret

    @staticmethod
    def init_app(app):
        '''初始化配置文件'''
        pass


# the config for development
class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:hgh15070417641@127.0.0.1:3306/idiom'
    DEBUG = True


# define the config
config = {
    'default': DevelopmentConfig
}