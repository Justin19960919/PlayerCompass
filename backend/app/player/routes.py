from app.player import bp

@bp.route('/')
def playerRoot():
    return 'this is player route'

@bp.route('/<playerId>/')
def playerStat(playerId):
  return {
    'id': f"I am player id: {playerId}"
  }