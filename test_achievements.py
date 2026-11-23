import sys
import os

# Forcer l'encodage UTF-8 pour Windows
if sys.platform == 'win32':
    os.environ['PYTHONIOENCODING'] = 'utf-8'
    sys.stdout.reconfigure(encoding='utf-8')

def test_achievement_conditions():
    """Teste toutes les conditions des achievements"""
    
    # Définition des achievements (copié de StatisticsPage.tsx)
    achievements = [
        # SÉRIE
        {"id": "streak-7", "name": "Débutant motivé", "condition": lambda s, st, xp, lv: st >= 7, "category": "streak"},
        {"id": "streak-30", "name": "Habitué", "condition": lambda s, st, xp, lv: st >= 30, "category": "streak"},
        {"id": "streak-100", "name": "Déterminé", "condition": lambda s, st, xp, lv: st >= 100, "category": "streak"},
        {"id": "streak-365", "name": "Inarrêtable", "condition": lambda s, st, xp, lv: st >= 365, "category": "streak"},
        
        # PROGRESSION
        {"id": "progress-50", "name": "Premier pas", "condition": lambda s, st, xp, lv: s["totalCorrectAnswers"] >= 50, "category": "progression"},
        {"id": "progress-200", "name": "En route", "condition": lambda s, st, xp, lv: s["totalCorrectAnswers"] >= 200, "category": "progression"},
        {"id": "progress-500", "name": "Assidu", "condition": lambda s, st, xp, lv: s["totalCorrectAnswers"] >= 500, "category": "progression"},
        {"id": "progress-1000", "name": "Expert", "condition": lambda s, st, xp, lv: s["totalCorrectAnswers"] >= 1000, "category": "progression"},
        {"id": "level-5", "name": "Apprenti confirmé", "condition": lambda s, st, xp, lv: lv >= 5, "category": "progression"},
        {"id": "level-10", "name": "Étudiant avancé", "condition": lambda s, st, xp, lv: lv >= 10, "category": "progression"},
        {"id": "level-15", "name": "Maître", "condition": lambda s, st, xp, lv: lv >= 15, "category": "progression"},
        
        # PERFECTION
        {"id": "perfect-10", "name": "Précision débutante", "condition": lambda s, st, xp, lv: s["totalExercisesAnswered"] > 0 and s["totalExercisesAnswered"] == s["totalCorrectAnswers"] and s["totalExercisesAnswered"] >= 10, "category": "perfection"},
        {"id": "perfect-50", "name": "Précision confirmée", "condition": lambda s, st, xp, lv: s["totalExercisesAnswered"] > 0 and s["totalExercisesAnswered"] == s["totalCorrectAnswers"] and s["totalExercisesAnswered"] >= 50, "category": "perfection"},
        {"id": "perfect-100", "name": "Perfectionniste", "condition": lambda s, st, xp, lv: s["totalExercisesAnswered"] > 0 and s["totalExercisesAnswered"] == s["totalCorrectAnswers"] and s["totalExercisesAnswered"] >= 100, "category": "perfection"},
        {"id": "perfect-500", "name": "Infaillible", "condition": lambda s, st, xp, lv: s["totalExercisesAnswered"] > 0 and s["totalExercisesAnswered"] == s["totalCorrectAnswers"] and s["totalExercisesAnswered"] >= 500, "category": "perfection"},
    ]
    
    # Scénarios de test
    test_scenarios = [
        {
            "name": "Nouveau joueur (0 exercice)",
            "stats": {"totalCorrectAnswers": 0, "totalExercisesAnswered": 0},
            "streak": 0,
            "xp": 0,
            "level": 1,
            "expected_unlocked": []
        },
        {
            "name": "Joueur débutant (7 jours de série)",
            "stats": {"totalCorrectAnswers": 10, "totalExercisesAnswered": 10},
            "streak": 7,
            "xp": 50,
            "level": 2,
            "expected_unlocked": ["streak-7", "perfect-10"]
        },
        {
            "name": "Joueur régulier (30 jours, 100 exercices)",
            "stats": {"totalCorrectAnswers": 100, "totalExercisesAnswered": 110},
            "streak": 30,
            "xp": 500,
            "level": 5,
            "expected_unlocked": ["streak-7", "streak-30", "progress-50", "level-5"]
        },
        {
            "name": "Joueur avancé (100 jours, 500 exercices, niveau 10)",
            "stats": {"totalCorrectAnswers": 500, "totalExercisesAnswered": 550},
            "streak": 100,
            "xp": 2000,
            "level": 10,
            "expected_unlocked": ["streak-7", "streak-30", "streak-100", "progress-50", "progress-200", "progress-500", "level-5", "level-10"]
        },
        {
            "name": "Expert (1000 exercices, niveau 15)",
            "stats": {"totalCorrectAnswers": 1000, "totalExercisesAnswered": 1100},
            "streak": 365,
            "xp": 5000,
            "level": 15,
            "expected_unlocked": ["streak-7", "streak-30", "streak-100", "streak-365", "progress-50", "progress-200", "progress-500", "progress-1000", "level-5", "level-10", "level-15"]
        },
        {
            "name": "Perfectionniste (50 exercices sans erreur)",
            "stats": {"totalCorrectAnswers": 50, "totalExercisesAnswered": 50},
            "streak": 5,
            "xp": 100,
            "level": 2,
            "expected_unlocked": ["perfect-10", "perfect-50", "progress-50"]
        },
        {
            "name": "Perfectionniste ultime (500 exercices sans erreur)",
            "stats": {"totalCorrectAnswers": 500, "totalExercisesAnswered": 500},
            "streak": 10,
            "xp": 1000,
            "level": 8,
            "expected_unlocked": ["perfect-10", "perfect-50", "perfect-100", "perfect-500", "progress-50", "progress-200", "progress-500", "level-5", "streak-7"]
        },
    ]
    
    # Exécution des tests
    print("=" * 60)
    print("TEST DES ACHIEVEMENTS")
    print("=" * 60)
    
    all_passed = True
    for scenario in test_scenarios:
        print(f"\nScénario : {scenario['name']}")
        print("-" * 40)
        
        stats = scenario["stats"]
        streak = scenario["streak"]
        xp = scenario["xp"]
        level = scenario["level"]
        expected = set(scenario["expected_unlocked"])
        
        # Évaluation des achievements
        unlocked = []
        for achievement in achievements:
            is_unlocked = achievement["condition"](stats, streak, xp, level)
            if is_unlocked:
                unlocked.append(achievement["id"])
        
        unlocked_set = set(unlocked)
        
        # Vérification
        if unlocked_set == expected:
            print(f"  [OK] PASS - {len(unlocked)} achievement(s) débloqué(s)")
            for aid in sorted(unlocked):
                ach = next(a for a in achievements if a["id"] == aid)
                print(f"    - {ach['name']}")
        else:
            print(f"  [ERR] FAIL")
            print(f"    Attendu : {sorted(expected)}")
            print(f"    Obtenu : {sorted(unlocked_set)}")
            missing = expected - unlocked_set
            extra = unlocked_set - expected
            if missing:
                print(f"    Manquants : {sorted(missing)}")
            if extra:
                print(f"    Supplémentaires : {sorted(extra)}")
            all_passed = False
    
    print("\n" + "=" * 60)
    if all_passed:
        print("[OK] TOUS LES TESTS ONT RÉUSSI")
    else:
        print("[ERR] CERTAINS TESTS ONT ÉCHOUÉ")
    print("=" * 60)
    
    return all_passed

if __name__ == "__main__":
    test_achievement_conditions()
