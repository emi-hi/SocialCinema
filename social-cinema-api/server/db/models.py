from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    icon = Column(String)
    email = Column(String)
    password = Column(String)
    
    def __repr__(self):
        return "<User(name='{}', icon='{}', email={}, password={})>"\
                .format(self.name, self.icon, self.email, self.password)