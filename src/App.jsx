import { useState } from "react";

export default function MonopolyBank() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(1500);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const addPlayer = () => {
    if (name && balance >= 0) {
      setPlayers([...players, { name, balance }]);
      setName("");
      setBalance(1500);
    }
  };

  const confirmPlayers = () => {
    setConfirmed(true);
  };

  const updateBalance = (amount) => {
    if (selectedPlayer !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[selectedPlayer].balance += amount;
      setPlayers(updatedPlayers);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Monopoly Bank</h1>
      {!confirmed && (
        <div className="mb-4 flex flex-col items-center">
          <input
            placeholder="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Starting Balance"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="p-2 border rounded"
          />
          <button onClick={addPlayer} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add Player</button>
          <button onClick={confirmPlayers} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Confirm Players</button>
        </div>
      )}
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-4 w-full">
          {players.length > 0 ? (
            players.map((player, index) => (
              <div 
                key={index} 
                className={`p-4 cursor-pointer border rounded ${selectedPlayer === index ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => setSelectedPlayer(index)}
              >
                <h2 className="text-lg font-semibold">{player.name}</h2>
                <p>Balance: ${player.balance}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No players added yet.</p>
          )}
        </div>
        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md flex flex-wrap justify-center gap-2">
          {[500, 100, 50, 20, 10, 5, 2, 1].map(amount => (
            <button key={amount} onClick={() => updateBalance(amount)} className="bg-blue-500 text-white px-4 py-2 rounded">+{amount}</button>
          ))}
          {[500, 100, 50, 20, 10, 5, 2, 1].map(amount => (
            <button key={-amount} onClick={() => updateBalance(-amount)} className="bg-red-500 text-white px-4 py-2 rounded">-{amount}</button>
          ))}
        </div>
      </div>
    </div>
  );
}